"use client";

import Link from "next/link";
import {
  Zap,
  Shield,
  CreditCard,
  Globe,
  ArrowRight,
  Check,
  Sparkles,
  Lock,
  BarChart3,
  Webhook,
  Terminal,
  Code,
  Star,
  Copy,
  Info,
  ArrowUpRight,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

// ─── Pricing Config ─────────────────────────────────────────────

const PLANS = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "For side projects and experiments",
    features: [
      "Up to 100 users",
      "Basic analytics",
      "Community support",
      "1 project",
    ],
    slug: null,
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    description: "For growing SaaS businesses",
    features: [
      "Unlimited users",
      "Advanced analytics",
      "Priority support",
      "Unlimited projects",
      "Custom domain",
      "API access",
    ],
    slug: "pro-plan",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/mo",
    description: "For teams that need everything",
    features: [
      "Everything in Pro",
      "SSO & SAML",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantee",
      "Audit logs",
    ],
    slug: "enterprise-plan",
    popular: false,
  },
];

// ─── Page Component ─────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden min-h-[100dvh]">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none dot-grid">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[var(--color-brand-500)] opacity-[0.03] blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[var(--color-accent-500)] opacity-[0.03] blur-[120px]" />
      </div>

      <HeroSection />
      {/* Visual gradient border line separating Hero and Bento Features */}
      <div className="h-[1px] w-full max-w-7xl mx-auto bg-gradient-to-r from-transparent via-[var(--color-accent-500)]/30 to-transparent" />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}

// ─── Hero Section ───────────────────────────────────────────────

function HeroSection() {
  const [copied, setCopied] = useState(false);

  const copyCloneCommand = () => {
    navigator.clipboard.writeText("git clone https://github.com/sumitttt4/Paymentintegration.git");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative px-6 pt-20 pb-16 md:pt-28 md:pb-24 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline and actions (7 columns) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass text-xs font-semibold text-[var(--text-secondary)] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-accent-500)]" />
            100% Free &amp; Open Source SaaS Template
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold leading-[1.05] tracking-tighter mb-6 text-[var(--text-primary)]">
            Payment integration is a <span className="gradient-text">nightmare.</span>
            <br />
            <span className="text-[var(--text-secondary)]">Let us handle it.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-lg text-[var(--text-secondary)] mb-8 max-w-[58ch] leading-relaxed">
            Stop building billing infrastructure. Clone this production-ready starter kit
            with user authentication (Better Auth), checkout billing, and customer portals
            already wired up using Dodo Payments as your global Merchant of Record.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-stretch sm:items-center mb-8">
            <a
              href="https://github.com/sumitttt4/Paymentintegration"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm px-7 py-3 hover:-translate-y-[1px] active:scale-[0.98] transition-all"
              id="hero-primary-github"
            >
              <Star className="w-4 h-4 fill-current" />
              Star &amp; Clone on GitHub
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <Link
              href="/#pricing"
              className="btn-secondary text-sm px-7 py-3 hover:-translate-y-[1px] active:scale-[0.98] transition-all"
              id="hero-secondary-demo"
            >
              Test Checkout Demo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Copy-Paste CLI Block */}
          <div className="w-full max-w-[500px] rounded-lg border border-[var(--border)] bg-zinc-950/85 p-3.5 font-mono text-[13px] text-zinc-300 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5 truncate">
              <Terminal className="w-4 h-4 text-[var(--color-accent-500)] shrink-0" />
              <span className="text-zinc-500 shrink-0">$</span>
              <span className="select-all truncate">git clone https://github.com/sumitttt4/Payment...</span>
            </div>
            <button
              onClick={copyCloneCommand}
              className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-[var(--color-accent-500)] hover:border-[var(--color-accent-500)] transition-all active:scale-95 cursor-pointer shrink-0 ml-3"
              title="Copy to clipboard"
            >
              {copied ? (
                <span className="text-xs text-[var(--color-accent-500)] px-1 font-semibold">Copied!</span>
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Code is the Hero / Product Preview (5 columns) */}
        <div className="lg:col-span-5 relative w-full flex items-center justify-center animate-float">
          {/* Visual gradient background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-500)]/10 to-transparent blur-[80px] -z-10 rounded-full" />

          {/* Device Mockup */}
          <div className="w-full glass rounded-xl border border-[var(--card-border)] shadow-2xl relative overflow-hidden">
            {/* Browser Header Bar */}
            <div className="flex items-center justify-between bg-zinc-950/70 px-4 py-3 border-b border-[var(--card-border)]">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <span className="text-xs text-[var(--text-muted)] font-mono tracking-tight select-none">dodo-starter.dev/dashboard</span>
              <div className="w-4" />
            </div>

            {/* Dashboard Mockup Content */}
            <div className="p-5 space-y-4 bg-zinc-950/20">
              {/* Connected Header status */}
              <div className="flex justify-between items-center bg-[var(--bg-secondary)] p-3 rounded-lg border border-[var(--border)]">
                <div>
                  <p className="text-[10px] text-[var(--text-muted)] font-mono uppercase tracking-wider">Payments Engine</p>
                  <p className="text-sm font-semibold font-heading text-[var(--text-primary)]">Dodo Connected</p>
                </div>
                <div className="flex items-center gap-1.5 bg-[var(--color-accent-500)]/10 px-2 py-0.5 rounded border border-[var(--color-accent-500)]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-500)] animate-pulse" />
                  <span className="text-[10px] text-[var(--color-accent-500)] font-semibold font-mono">LIVE_TEST</span>
                </div>
              </div>

              {/* Status Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]">
                  <p className="text-[10px] text-[var(--text-muted)] font-mono">ACTIVE SUBSCRIPTION</p>
                  <p className="text-sm font-bold text-[var(--text-primary)] mt-1 font-heading">Pro Plan</p>
                </div>
                <div className="p-3 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]">
                  <p className="text-[10px] text-[var(--text-muted)] font-mono">BILLING PORTAL</p>
                  <span className="text-xs font-semibold text-[var(--color-accent-500)] inline-flex items-center gap-1 hover:underline mt-1 cursor-pointer">
                    Manage Billing
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Syntax Highlighted Code block representing the API */}
              <div className="p-3.5 bg-zinc-950/90 rounded-lg font-mono text-[11px] leading-relaxed text-zinc-400 border border-zinc-800">
                <div className="flex items-center justify-between text-[10px] text-zinc-500 pb-2 mb-2 border-b border-zinc-900">
                  <span>src/lib/auth.ts</span>
                  <Code className="w-3.5 h-3.5 text-zinc-600" />
                </div>
                <p className="text-zinc-600">// Setup Dodo Payments plugin</p>
                <p><span className="text-zinc-500">export const</span> auth = <span className="text-zinc-300">betterAuth</span>(&#123;</p>
                <p>&nbsp;&nbsp;plugins: [</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[var(--color-accent-500)]">dodopayments</span>(&#123;</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;createCustomerOnSignUp: <span className="text-emerald-400">true</span>,</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;checkout: &#123; slug: <span className="text-emerald-400">&apos;pro-plan&apos;</span> &#125;</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&#125;)</p>
                <p>&nbsp;&nbsp;]</p>
                <p>&#125;);</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Bento Features Grid ─────────────────────────────────────────

function FeaturesSection() {
  return (
    <section id="features" className="px-6 py-20 md:py-24 max-w-7xl mx-auto">
      <div className="mb-16 text-left max-w-2xl">
        {/* Section label */}
        <span className="text-xs font-bold font-mono uppercase tracking-widest text-[var(--color-accent-500)]">Architecture</span>
        <h2 className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight mt-2 mb-4 text-[var(--text-primary)]">
          Everything pre-configured.
        </h2>
        <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed">
          Skip weeks of reading API documentations. We wired the best developer-first tools together
          under a unified database schema.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Card 1: 7-columns bento on medium+ */}
        <div className="md:col-span-7 card group flex flex-col justify-between overflow-hidden relative min-h-[300px]">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-[var(--color-accent-500)]/5 to-transparent blur-[60px] pointer-events-none -z-10" />
          <div>
            <div className="w-10 h-10 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 text-[var(--color-accent-500)]" />
            </div>
            <h3 className="text-lg font-bold font-heading mb-2 text-[var(--text-primary)]">Automatic Customer Provisioning</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-[55ch]">
              Whenever a user signs up via email or OAuth, the Better Auth Dodo plugin triggers automatically to provision a customer profile on Dodo Payments and syncs their billing ID immediately.
            </p>
          </div>
          <div className="pt-6 border-t border-[var(--border)] mt-6 flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-mono">
            <Check className="w-3.5 h-3.5 text-[var(--color-accent-500)] shrink-0" /> createCustomerOnSignUp: true
          </div>
        </div>

        {/* Card 2: 5-columns bento */}
        <div className="md:col-span-5 card group flex flex-col justify-between overflow-hidden relative min-h-[300px]">
          <div>
            <div className="w-10 h-10 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              <Globe className="w-5 h-5 text-[var(--color-accent-500)]" />
            </div>
            <h3 className="text-lg font-bold font-heading mb-2 text-[var(--text-primary)]">Global Tax compliance</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Dodo Payments acts as your Merchant of Record, handling VAT, sales tax calculations, compliance reporting, and global remittance across 150+ countries.
            </p>
          </div>
          <div className="pt-6 border-t border-[var(--border)] mt-6 flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-mono">
            <Check className="w-3.5 h-3.5 text-[var(--color-accent-500)] shrink-0" /> MoR VAT Compliance
          </div>
        </div>

        {/* Card 3: 5-columns bento */}
        <div className="md:col-span-5 card group flex flex-col justify-between overflow-hidden relative min-h-[300px]">
          <div>
            <div className="w-10 h-10 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              <Webhook className="w-5 h-5 text-[var(--color-accent-500)]" />
            </div>
            <h3 className="text-lg font-bold font-heading mb-2 text-[var(--text-primary)]">Real-Time Sync Webhooks</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Subscription state events (active, cancelled, hold) flow from Dodo secure webhooks. The built-in sync helper updates the local PostgreSQL database immediately.
            </p>
          </div>
          <div className="pt-6 border-t border-[var(--border)] mt-6 flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-mono">
            <Check className="w-3.5 h-3.5 text-[var(--color-accent-500)] shrink-0" /> Secure Webhook Signatures
          </div>
        </div>

        {/* Card 4: 7-columns bento */}
        <div className="md:col-span-7 card group flex flex-col justify-between overflow-hidden relative min-h-[300px]">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-[var(--color-accent-500)]/5 to-transparent blur-[60px] pointer-events-none -z-10" />
          <div>
            <div className="w-10 h-10 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              <BarChart3 className="w-5 h-5 text-[var(--color-accent-500)]" />
            </div>
            <h3 className="text-lg font-bold font-heading mb-2 text-[var(--text-primary)]">Self-Service Billing Portal</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-[55ch]">
              Let your customers manage their own accounts. The billing portal endpoint generates a secure URL where subscribers can cancel plans, view invoices, or update details without contacting support.
            </p>
          </div>
          <div className="pt-6 border-t border-[var(--border)] mt-6 flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-mono">
            <Check className="w-3.5 h-3.5 text-[var(--color-accent-500)] shrink-0" /> authClient.dodopayments.customer.portal()
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing Section (Showcase/Demo Component) ───────────────────

function PricingSection() {
  return (
    <section id="pricing" className="px-6 py-20 md:py-24 bg-[var(--bg-secondary)] border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[var(--bg)] border border-[var(--border)] px-3 py-1 rounded text-xs font-mono text-[var(--text-secondary)] mb-3">
              <Info className="w-3.5 h-3.5 text-[var(--color-accent-500)]" />
              Included Demo Component
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight text-[var(--text-primary)]">
              Example pricing page template
            </h2>
            <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed mt-2">
              This pricing section is included in the codebase and comes fully integrated.
              Clicking a plan demonstrates the secure, authenticated redirect to Dodo Payments&apos; checkout.
            </p>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
          {PLANS.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  plan,
}: {
  plan: (typeof PLANS)[number];
}) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!plan.slug) return;
    setLoading(true);
    try {
      const { data, error } =
        await authClient.dodopayments.checkoutSession({
          slug: plan.slug,
        });
      if (error) {
        window.location.href = "/login";
        return;
      }
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch {
      window.location.href = "/login";
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`relative rounded-xl p-8 transition-all duration-200 flex flex-col justify-between ${
        plan.popular
          ? "glass glow gradient-border scale-[1.01] border border-[var(--color-accent-500)]/30"
          : "glass"
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-[var(--color-accent-500)] text-[#050714] text-[10px] font-bold uppercase tracking-wider">
          Included Example slug
        </div>
      )}

      <div>
        <div className="mb-6">
          <h3 className="text-lg font-bold font-heading text-[var(--text-primary)] mb-1">{plan.name}</h3>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">{plan.description}</p>
        </div>

        <div className="mb-8 flex items-baseline">
          <span className="text-3xl font-extrabold text-[var(--text-primary)] font-heading">{plan.price}</span>
          {plan.period && (
            <span className="text-xs text-[var(--text-muted)] ml-1 font-mono">{plan.period}</span>
          )}
        </div>

        <ul className="space-y-2.5 mb-8">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)]">
              <Check className="w-4 h-4 text-[var(--color-accent-500)] mt-0.5 shrink-0" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {plan.slug ? (
        <button
          onClick={handleCheckout}
          disabled={loading}
          className={`w-full ${plan.popular ? "btn-primary" : "btn-secondary"} text-xs py-2.5`}
          id={`pricing-${plan.slug}`}
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              Redirect to checkout
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      ) : (
        <Link
          href="/login"
          className={`w-full ${plan.popular ? "btn-primary" : "btn-secondary"} text-xs py-2.5`}
          id="pricing-free"
        >
          Setup User Auth
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  );
}

// ─── CTA Section ─────────────────────────────────────────────────

function CTASection() {
  return (
    <section className="px-6 py-20 md:py-24 max-w-5xl mx-auto">
      <div className="glass rounded-2xl p-8 md:p-12 text-left relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-[var(--color-accent-500)]/5 to-transparent blur-[80px] pointer-events-none -z-10" />
        
        <div className="max-w-xl">
          <h2 className="text-3xl font-heading font-extrabold tracking-tight text-[var(--text-primary)] mb-3">
            SaaS billing doesn&apos;t have to be hard.
          </h2>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
            Clone the kit, configure your Dodo api keys, and deploy to Vercel in less than five minutes.
            All code is free and open-source under the MIT license.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
          <a
            href="https://github.com/sumitttt4/Paymentintegration"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm px-6 py-3"
            id="cta-clone"
          >
            <Star className="w-4 h-4 fill-current" />
            Star on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="px-6 py-12 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[var(--color-brand-500)] to-[var(--color-accent-500)] flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-sm tracking-tight text-[var(--text-primary)]">DodoStarter</span>
        </div>
        <p className="text-xs text-[var(--text-muted)]">
          Open source starter kit. Powered by{" "}
          <a
            href="https://dodopayments.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent-500)] hover:underline font-semibold"
          >
            Dodo Payments
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
