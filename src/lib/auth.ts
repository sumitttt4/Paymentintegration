import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  dodopayments,
  checkout,
  portal,
  webhooks,
} from "@dodopayments/better-auth";
import DodoPayments from "dodopayments";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";

// ─── Dodo Payments SDK Client ───────────────────────────────────

const dodoClient = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY || "test_key_placeholder",
  environment:
    (process.env.DODO_PAYMENTS_ENVIRONMENT as "test_mode" | "live_mode") ||
    "test_mode",
});

// ─── Product → Slug Map ─────────────────────────────────────────
// Keep this in sync with your Dodo dashboard products.
// The webhook handler derives planSlug from productId via this map
// so multi-plan works without hardcoding.

const PRODUCTS = [
  {
    productId:
      process.env.NEXT_PUBLIC_DODO_PRO_PRODUCT_ID || "pdt_placeholder_pro",
    slug: "pro-plan",
  },
  {
    productId:
      process.env.NEXT_PUBLIC_DODO_ENTERPRISE_PRODUCT_ID ||
      "pdt_placeholder_enterprise",
    slug: "enterprise-plan",
  },
] as const;

// Reverse map: productId → slug (used in webhook handler)
const productIdToSlug = new Map(
  PRODUCTS.map((p) => [p.productId, p.slug])
);

// ─── Better Auth Configuration ──────────────────────────────────

export const auth = betterAuth({
  secret:
    process.env.BETTER_AUTH_SECRET || "test_better_auth_secret_placeholder",
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      dodoCustomerId: {
        type: "string",
        required: false,
        defaultValue: null,
        input: false, // managed by the plugin, not user input
      },
    },
  },
  plugins: [
    dodopayments({
      client: dodoClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [...PRODUCTS],
          successUrl: "/dashboard?checkout=success",
          authenticatedUsersOnly: true,
        }),
        portal(),
        webhooks({
          webhookKey:
            process.env.DODO_PAYMENTS_WEBHOOK_SECRET ||
            "test_webhook_secret_placeholder",

          // ── Full event coverage ─────────────────────────────
          // Every subscription lifecycle event syncs to our DB.
          // The plugin provides typed payloads — we extract the
          // fields we need in syncSubscription.
          onSubscriptionActive: async (payload) => {
            await syncSubscription(payload);
          },
          onSubscriptionUpdated: async (payload) => {
            await syncSubscription(payload);
          },
          onSubscriptionCancelled: async (payload) => {
            await syncSubscription(payload);
          },
          onSubscriptionFailed: async (payload) => {
            await syncSubscription(payload);
          },
          onSubscriptionOnHold: async (payload) => {
            await syncSubscription(payload);
          },
          onSubscriptionExpired: async (payload) => {
            await syncSubscription(payload);
          },
          onSubscriptionRenewed: async (payload) => {
            await syncSubscription(payload);
          },
          onSubscriptionPlanChanged: async (payload) => {
            await syncSubscription(payload);
          },
          onSubscriptionCancellationScheduled: async (payload) => {
            await syncSubscription(payload);
          },
        }),
      ],
    }),
  ],
});

// ─── Subscription Sync Types ─────────────────────────────────────

interface SubscriptionWebhookEvent {
  business_id: string;
  type: string;
  timestamp: string | Date;
  data: {
    subscription_id: string;
    product_id: string;
    status: string;
    quantity: number;
    currency: string;
    next_billing_date: string | Date | null;
    customer: {
      customer_id: string;
      email: string;
      name: string;
      phone_number?: string | null;
    };
    customer_id?: string;
  };
}

// ─── Subscription Sync Helper ───────────────────────────────────
// Upserts subscription state from any Dodo subscription webhook event.
//
// Race condition note: If a webhook lands before createCustomerOnSignUp
// has written dodoCustomerId to the user row, the lookup will fail.
// This is unlikely (checkout requires auth, so the ID should exist),
// but we fallback to lookup by email if dodoCustomerId is missing,
// and backfill the ID. If not found, we retry once after 2 seconds.

async function syncSubscription(payload: SubscriptionWebhookEvent) {
  const data = payload?.data;
  if (!data?.subscription_id) {
    return;
  }

  const customerId: string | undefined =
    data.customer?.customer_id ?? data.customer_id;
  if (!customerId) {
    return;
  }

  const customerEmail = data.customer?.email;

  // Attempt to find user, with fallback to email and one retry for race conditions
  let matchingUser = await findUserByCustomerIdOrEmail(customerId, customerEmail);
  if (!matchingUser) {
    // Retry once after 2s — covers the narrow signup race window
    await new Promise((r) => setTimeout(r, 2000));
    matchingUser = await findUserByCustomerIdOrEmail(customerId, customerEmail);
  }

  if (!matchingUser) {
    console.warn(
      `[Dodo Sync] User not found (Customer ID: ${customerId}, Email: ${customerEmail ?? "N/A"}). Skipping sync.`
    );
    return;
  }

  // Derive slug from productId→slug map; fall back to "unknown"
  const planSlug = productIdToSlug.get(data.product_id) ?? "unknown";

  await db
    .insert(schema.subscription)
    .values({
      id: data.subscription_id,
      userId: matchingUser.id,
      status: data.status ?? "unknown",
      productId: data.product_id ?? "unknown",
      planSlug,
      quantity: data.quantity ?? 1,
      billingCurrency: data.currency ?? "USD",
      nextBillingDate: data.next_billing_date
        ? new Date(data.next_billing_date)
        : null,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: schema.subscription.id,
      set: {
        status: data.status ?? "unknown",
        planSlug,
        quantity: data.quantity ?? 1,
        billingCurrency: data.currency ?? "USD",
        nextBillingDate: data.next_billing_date
          ? new Date(data.next_billing_date)
          : null,
        updatedAt: new Date(),
      },
    });
}

async function findUserByCustomerIdOrEmail(customerId: string, email?: string) {
  if (customerId) {
    const [found] = await db
      .select()
      .from(schema.user)
      .where(eq(schema.user.dodoCustomerId, customerId))
      .limit(1);
    if (found) return found;
  }
  if (email) {
    const [found] = await db
      .select()
      .from(schema.user)
      .where(eq(schema.user.email, email))
      .limit(1);
    if (found) {
      // Backfill customer ID gracefully
      await db
        .update(schema.user)
        .set({ dodoCustomerId: customerId })
        .where(eq(schema.user.id, found.id));
      return { ...found, dodoCustomerId: customerId };
    }
  }
  return null;
}
