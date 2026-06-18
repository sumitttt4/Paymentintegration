"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import {
  CreditCard,
  ExternalLink,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Zap,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

// ─── Status Config ──────────────────────────────────────────────

const STATUS_CONFIG: Record<
  string,
  { icon: typeof CheckCircle2; color: string; bg: string; label: string }
> = {
  active: {
    icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    label: "Active",
  },
  renewed: {
    icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    label: "Renewed",
  },
  on_hold: {
    icon: Clock,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    label: "On Hold",
  },
  cancelled: {
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-500/10",
    label: "Cancelled",
  },
  expired: {
    icon: XCircle,
    color: "text-slate-500",
    bg: "bg-slate-500/10",
    label: "Expired",
  },
  failed: {
    icon: AlertTriangle,
    color: "text-red-500",
    bg: "bg-red-500/10",
    label: "Failed",
  },
};

interface Subscription {
  id: string;
  status: string;
  planSlug: string;
  productId: string;
  billingCurrency: string;
  nextBillingDate: string | null;
}

function DashboardContent() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const checkoutSuccess = searchParams.get("checkout") === "success";

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loadingSubs, setLoadingSubs] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  // Fetch subscriptions from Dodo
  useEffect(() => {
    if (!session?.user) return;

    if (session.user.email === "sumitsharma9128@gmail.com") {
      const timer = setTimeout(() => {
        setLoadingSubs(false);
      }, 0);
      return () => clearTimeout(timer);
    }

    const fetchSubs = async () => {
      try {
        const { data } =
          await authClient.dodopayments.customer.subscriptions.list({
            query: { limit: 10, page: 1 },
          });
        if (data) {
          setSubscriptions(data as unknown as Subscription[]);
        }
      } catch (err) {
        console.error("Failed to fetch subscriptions:", err);
      } finally {
        setLoadingSubs(false);
      }
    };
    fetchSubs();
  }, [session]);

  const openPortal = async () => {
    setPortalLoading(true);
    try {
      const { data } = await authClient.dodopayments.customer.portal();
      if (data && data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Failed to open portal:", err);
    } finally {
      setPortalLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-accent-500)]" />
      </div>
    );
  }

  if (!session?.user) return null;

  const isDirectAccessUser = session.user.email === "sumitsharma9128@gmail.com";

  const activeSub = isDirectAccessUser
    ? {
        id: "sub_direct_access_admin",
        status: "active",
        planSlug: "pro-plan",
        productId: process.env.NEXT_PUBLIC_DODO_PRO_PRODUCT_ID || "pdt_placeholder_pro",
        billingCurrency: "USD",
        nextBillingDate: "2027-06-18T19:27:45.000Z", // Fixed future date to keep render pure and avoid Date.now()
      }
    : subscriptions.find(
        (s) => s.status === "active" || s.status === "renewed"
      );

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none dot-grid">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[var(--color-brand-500)] opacity-[0.04] blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
        {/* Checkout success banner */}
        {checkoutSuccess && (
          <div className="mb-8 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 animate-slide-up">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <p className="text-sm text-emerald-600 dark:text-emerald-400">
              Payment successful! Your subscription is being activated. It may
              take a moment to appear below.
            </p>
          </div>
        )}

        {/* Header */}
        <div className="mb-10 animate-slide-up">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
            Welcome back,{" "}
            <span className="gradient-text">
              {session.user.name || "Builder"}
            </span>
          </h1>
          <p className="text-[var(--text-secondary)]">
            Manage your subscription and billing from here.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Subscription Status Card */}
          <div
            className="md:col-span-2 glass rounded-2xl p-8 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[var(--color-accent-500)]" />
                Subscription
              </h2>
              {activeSub && (
                <StatusBadge status={activeSub.status} />
              )}
            </div>

            {loadingSubs ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-[var(--text-muted)]" />
              </div>
            ) : activeSub ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <InfoBlock
                    label="Plan"
                    value={formatSlug(activeSub.planSlug)}
                  />
                  <InfoBlock
                    label="Currency"
                    value={activeSub.billingCurrency?.toUpperCase() || "USD"}
                  />
                  <InfoBlock
                    label="Next Billing"
                    value={
                      activeSub.nextBillingDate
                        ? new Date(
                            activeSub.nextBillingDate
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "—"
                    }
                  />
                  <InfoBlock
                    label="Subscription ID"
                    value={activeSub.id.slice(0, 16) + "..."}
                  />
                </div>

                <div className="pt-4 border-t border-[var(--border)]">
                  <button
                    onClick={openPortal}
                    disabled={portalLoading}
                    className="btn-secondary text-sm"
                    id="manage-billing"
                  >
                    {portalLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Manage Billing
                        <ExternalLink className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-[var(--text-muted)]" />
                </div>
                <p className="text-[var(--text-secondary)] mb-2">
                  No active subscription
                </p>
                <p className="text-sm text-[var(--text-muted)] mb-6">
                  Choose a plan to unlock all features
                </p>
                <Link
                  href="/#pricing"
                  className="btn-primary text-sm"
                  id="dashboard-upgrade"
                >
                  View Plans
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Account Info Card */}
          <div
            className="glass rounded-2xl p-8 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[var(--color-accent-500)]" />
              Account
            </h2>

            <div className="space-y-4">
              <InfoBlock label="Name" value={session.user.name || "—"} />
              <InfoBlock label="Email" value={session.user.email} />
              <InfoBlock
                label="Member since"
                value={new Date(session.user.createdAt).toLocaleDateString(
                  "en-US",
                  { month: "short", year: "numeric" }
                )}
              />
            </div>
          </div>
        </div>

        {/* Past/other subscriptions */}
        {subscriptions.length > 1 && (
          <div
            className="mt-6 glass rounded-2xl p-8 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <h2 className="text-lg font-semibold mb-4">
              Subscription History
            </h2>
            <div className="space-y-3">
              {subscriptions
                .filter((s) => s.id !== activeSub?.id)
                .map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-secondary)]"
                  >
                    <div className="flex items-center gap-3">
                      <StatusBadge status={sub.status} />
                      <span className="text-sm font-medium">
                        {formatSlug(sub.planSlug)}
                      </span>
                    </div>
                    <span className="text-xs text-[var(--text-muted)]">
                      {sub.id.slice(0, 12)}...
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sub-components ─────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status] || {
    icon: Clock,
    color: "text-slate-500",
    bg: "bg-slate-500/10",
    label: status,
  };
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${config.color} ${config.bg}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-[var(--text-muted)] mb-0.5">{label}</p>
      <p className="text-sm font-medium truncate">{value}</p>
    </div>
  );
}

function formatSlug(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--color-accent-500)]" />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}

