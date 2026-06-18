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
  Play,
  RefreshCw,
  UserPlus,
} from "lucide-react";
import { useState, useEffect } from "react";

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
      {/* Visual gradient border line separating Bento Features and Checkout Simulator */}
      <div className="h-[1px] w-full max-w-7xl mx-auto bg-gradient-to-r from-transparent via-[var(--color-accent-500)]/30 to-transparent" />
      <CheckoutDemoSimulator />
      {/* Visual gradient border line separating Checkout Simulator and CTA */}
      <div className="h-[1px] w-full max-w-7xl mx-auto bg-gradient-to-r from-transparent via-[var(--color-accent-500)]/30 to-transparent" />
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
              href="/#demo"
              className="btn-secondary text-sm px-7 py-3 hover:-translate-y-[1px] active:scale-[0.98] transition-all"
              id="hero-secondary-demo"
            >
              Try Interactive Demo
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

// ─── Checkout Simulator Section ──────────────────────────────────

const RANDOM_PROFILES = [
  { name: "Alex Rivera", email: "alex@example.com", customerId: "cust_91j81h2k" },
  { name: "Alice Vance", email: "alice@example.com", customerId: "cust_3k92h4l9" },
  { name: "David Miller", email: "david.m@example.com", customerId: "cust_8f2h1j8n" },
  { name: "Elena Rostova", email: "elena@example.com", customerId: "cust_7g3k9j1a" },
  { name: "Hiroshi Sato", email: "hiroshi@example.com", customerId: "cust_6f8n2k8l" },
  { name: "Sophia Martinez", email: "sophia@example.com", customerId: "cust_5h9k3m2b" }
];

const SIMULATOR_STEPS = [
  {
    title: "1. User Registration",
    shortDesc: "Sign-up triggers provisioning",
    description: "When a developer or customer enters credentials, the authentication endpoint registers the account locally in your database.",
    icon: UserPlus,
    mockupType: "form" as const,
  },
  {
    title: "2. Dodo Customer Sync",
    shortDesc: "Automatic backfill & mapping",
    description: "Better Auth's Dodo Payments plugin intercepts the sign-up, provisions a corresponding customer on Dodo Payments, and saves the unique 'dodoCustomerId' to your DB.",
    icon: Zap,
    mockupType: "schema" as const,
  },
  {
    title: "3. Redirect to Checkout",
    shortDesc: "Secure hosted checkout session",
    description: "When the customer requests a premium subscription, your backend fetches an authenticated Checkout Session URL from Dodo Payments and redirects the user.",
    icon: CreditCard,
    mockupType: "checkout" as const,
  },
  {
    title: "4. Webhook & Database Sync",
    shortDesc: "Real-time payment sync",
    description: "Once payment completes using a test credit card, Dodo Payments securely broadcasts a signed webhook payload ('subscription.active') back to your backend, syncing status automatically.",
    icon: Webhook,
    mockupType: "webhook" as const,
  },
  {
    title: "5. Access Unlocked",
    shortDesc: "Premium features activated",
    description: "The customer is returned safely to your application dashboard. Their active subscription status is read, unlocking paid access and rendering customer billing portal access.",
    icon: Shield,
    mockupType: "dashboard" as const,
  }
];

function CheckoutDemoSimulator() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState<"mockup" | "logs">("mockup");
  const [isSimulating, setIsSimulating] = useState(false);
  const [profile, setProfile] = useState(RANDOM_PROFILES[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * RANDOM_PROFILES.length);
    setProfile(RANDOM_PROFILES[randomIndex]);
  }, []);

  const currentStep = SIMULATOR_STEPS[activeStep];

  const rotateProfile = () => {
    const currentIndex = RANDOM_PROFILES.findIndex((p) => p.email === profile.email);
    const nextIndex = (currentIndex + 1) % RANDOM_PROFILES.length;
    setProfile(RANDOM_PROFILES[nextIndex]);
  };

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % SIMULATOR_STEPS.length);
  };

  const handlePrev = () => {
    setActiveStep((prev) => (prev - 1 + SIMULATOR_STEPS.length) % SIMULATOR_STEPS.length);
  };

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStep(0);
    rotateProfile();
    
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < SIMULATOR_STEPS.length) {
        setActiveStep(step);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 3500);
  };

  const getTerminalLogs = (stepIdx: number) => {
    switch (stepIdx) {
      case 0:
        return `[AUTH] Request: POST /api/auth/signup
[AUTH] Creating new user record in PostgreSQL...
[DB] INSERT INTO users (id, name, email) VALUES (1, '${profile.name}', '${profile.email}')
[DB] User registered successfully.`;
      case 1:
        return `[DODO PLUGIN] Intercepted user signup for ${profile.email}
[DODO API] Requesting customer creation...
[DODO API] POST https://api.dodopayments.com/v1/customers
[DODO API] Response: 201 Created (ID: ${profile.customerId})
[DB] UPDATE users SET dodoCustomerId = '${profile.customerId}' WHERE id = 1`;
      case 2:
        return `[API] Request: POST /api/auth/dodopayments/checkout-session
[API] Generating checkout session for ${profile.customerId}...
[DODO API] POST https://api.dodopayments.com/v1/checkout-sessions
[DODO API] Response: 200 OK (URL: https://checkout.dodopayments.com/buy/session_9a8b7c)
[REDIRECT] Redirecting browser session to checkout portal...`;
      case 3:
        return `[WEBHOOK] Received payload from Dodo Payments
[WEBHOOK] Validating headers and signature... OK
[WEBHOOK] Event type: subscription.active
[DB] INSERT INTO subscriptions (id, userId, status, planId, currency) 
     VALUES ('sub_38a2', 1, 'active', 'pdt_pro', 'USD')
[DB] Database state synchronized.`;
      case 4:
        return `[CLIENT] Navigation redirect: /dashboard?checkout=success
[API] Request: GET /api/user/subscription
[API] Response: 200 OK (status: ACTIVE)
[CLIENT] Subscription status active. Unlocking dashboard panels...`;
      default:
        return "";
    }
  };

  return (
    <section id="demo" className="px-6 py-20 md:py-24 bg-[var(--bg-secondary)] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[var(--color-accent-500)]/5 to-transparent blur-[120px] pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-left max-w-3xl">
          <span className="text-xs font-bold font-mono uppercase tracking-widest text-[var(--color-accent-500)]">Integration Blueprint</span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight mt-2 mb-4 text-[var(--text-primary)]">
            How does it work? Run the checkout demo.
          </h2>
          <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed">
            See exactly what happens from the moment a user signs up to when their subscription is provisioned, paid, and synced to your database in real time.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Stepper Navigation (5 columns) */}
          <div className="lg:col-span-5 space-y-4">
            {SIMULATOR_STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = idx === activeStep;
              return (
                <button
                  key={step.title}
                  onClick={() => {
                    setActiveStep(idx);
                    setIsSimulating(false);
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "glass-strong border-[var(--color-accent-500)]/40 shadow-lg"
                      : "glass border-transparent hover:border-[var(--border)] opacity-60 hover:opacity-90"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg border transition-colors ${
                      isActive 
                        ? "bg-[var(--color-accent-500)]/10 border-[var(--color-accent-500)]/30 text-[var(--color-accent-500)]" 
                        : "bg-[var(--bg)] border-[var(--border)] text-[var(--text-muted)]"
                    }`}>
                      <StepIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold font-heading transition-colors ${
                        isActive ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
                      }`}>
                        {step.title}
                      </h4>
                      <p className="text-xs text-[var(--text-muted)] mt-1">
                        {step.shortDesc}
                      </p>
                    </div>
                  </div>
                  {isActive && (
                    <div className="mt-3 pl-14 text-xs text-[var(--text-secondary)] leading-relaxed animate-fade-in">
                      {step.description}
                    </div>
                  )}
                </button>
              );
            })}

            {/* Stepper Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={runSimulation}
                disabled={isSimulating}
                className="btn-primary text-xs py-2.5 px-5 hover:-translate-y-[1px] active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Simulating...
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Autoplay Demo
                  </>
                )}
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-lg glass border border-[var(--border)] hover:border-[var(--color-accent-500)]/30 text-xs transition-colors hover:text-[var(--color-accent-500)] cursor-pointer"
                  title="Previous Step"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-lg glass border border-[var(--border)] hover:border-[var(--color-accent-500)]/30 text-xs transition-colors hover:text-[var(--color-accent-500)] cursor-pointer"
                  title="Next Step"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Dynamic Screen (7 columns) */}
          <div className="lg:col-span-7 w-full">
            <div className="glass rounded-2xl border border-[var(--card-border)] shadow-2xl overflow-hidden relative">
              {/* Window Header */}
              <div className="bg-zinc-950/80 px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab("mockup")}
                    className={`px-3 py-1 rounded text-xs font-medium transition-all cursor-pointer ${
                      activeTab === "mockup"
                        ? "bg-zinc-800 text-[var(--color-accent-500)]"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    Interactive Mockup
                  </button>
                  <button
                    onClick={() => setActiveTab("logs")}
                    className={`px-3 py-1 rounded text-xs font-medium transition-all cursor-pointer ${
                      activeTab === "logs"
                        ? "bg-zinc-800 text-[var(--color-accent-500)]"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    Terminal Logs
                  </button>
                </div>
                <div className="w-12" />
              </div>

              {/* Dynamic Viewport Container */}
              <div className="p-6 min-h-[380px] bg-zinc-950/20 flex flex-col justify-center">
                {activeTab === "logs" ? (
                  <div className="font-mono text-xs leading-relaxed text-zinc-400 p-4 bg-zinc-950/80 rounded-xl border border-zinc-900 shadow-inner select-all whitespace-pre-wrap">
                    <div className="flex items-center justify-between text-[10px] text-zinc-600 pb-2 mb-3 border-b border-zinc-900">
                      <span>do-do-starter-server.log</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
                    </div>
                    {getTerminalLogs(activeStep)}
                  </div>
                ) : (
                  <div className="w-full flex items-center justify-center animate-fade-in">
                    {/* Render active mockup representation */}
                    {currentStep.mockupType === "form" && (
                      <div className="w-full max-w-xs p-6 glass rounded-xl border border-[var(--border)] text-left">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-sm font-bold font-heading text-[var(--text-primary)]">Create Account</h4>
                          <button
                            onClick={rotateProfile}
                            className="text-[10px] font-bold text-[var(--color-accent-500)] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <RefreshCw className="w-3 h-3" />
                            Random User
                          </button>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-[10px] uppercase font-bold text-[var(--text-muted)] mb-1">Full Name</label>
                            <input
                              type="text"
                              value={profile.name}
                              disabled
                              className="w-full px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-xs text-[var(--text-primary)] focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-bold text-[var(--text-muted)] mb-1">Email</label>
                            <input
                              type="email"
                              value={profile.email}
                              disabled
                              className="w-full px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-xs text-[var(--text-primary)] focus:outline-none"
                            />
                          </div>
                          <button
                            onClick={() => {
                              setActiveStep(1);
                              setIsSimulating(false);
                            }}
                            className="w-full btn-primary text-xs py-2 mt-2 flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            Submit Credentials
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}

                    {currentStep.mockupType === "schema" && (
                      <div className="w-full max-w-sm p-4 space-y-4">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                          <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-center w-full md:w-36 font-sans">
                            <p className="text-[10px] font-mono text-[var(--text-muted)]">LOCAL POSTGRES</p>
                            <p className="text-xs font-bold text-[var(--text-primary)] mt-1 truncate" title={profile.email}>{profile.email}</p>
                            <div className="inline-flex mt-2 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-400">
                              {profile.customerId}
                            </div>
                          </div>

                          <div className="flex flex-col items-center gap-1 text-[var(--color-accent-500)]">
                            <span className="text-[9px] font-mono font-bold tracking-wider">SYNCED</span>
                            <ArrowRight className="w-5 h-5 hidden md:block" />
                          </div>

                          <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-center w-full md:w-36 font-sans">
                            <p className="text-[10px] font-mono text-[var(--text-muted)]">DODO CUSTOMERS</p>
                            <p className="text-xs font-bold text-[var(--text-primary)] mt-1 truncate" title={profile.name}>{profile.name}</p>
                            <div className="inline-flex mt-2 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-400">
                              Active Profile
                            </div>
                          </div>
                        </div>
                        <p className="text-[11px] text-[var(--text-muted)] text-center italic">
                          Better Auth automatically maps the customer ID back to your local user schema.
                        </p>
                      </div>
                    )}

                    {currentStep.mockupType === "checkout" && (
                      <div className="w-full max-w-xs p-5 bg-zinc-900/95 border border-zinc-800 rounded-xl shadow-xl text-left">
                        <div className="flex justify-between items-center pb-3 border-b border-zinc-800 mb-4">
                          <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold">Dodo Payments Checkout</span>
                          <span className="text-[10px] font-semibold text-[var(--color-accent-500)] bg-[var(--color-accent-500)]/10 px-1.5 py-0.5 rounded">TEST_MODE</span>
                        </div>
                        <div className="space-y-3 text-xs">
                          <div className="flex justify-between">
                            <span className="text-zinc-400">Subscription Item:</span>
                            <span className="font-bold text-zinc-200">Pro Plan</span>
                          </div>
                          <div className="flex justify-between pb-3 border-b border-zinc-800">
                            <span className="text-zinc-400">Amount due:</span>
                            <span className="font-extrabold text-[var(--color-accent-500)]">$29.00 / month</span>
                          </div>
                          <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800 space-y-1.5">
                            <label className="text-[9px] text-zinc-500 block uppercase font-bold">Credit Card</label>
                            <input
                              type="text"
                              value="4242 •••• •••• 4242"
                              disabled
                              className="w-full bg-zinc-900 border border-zinc-800 text-[11px] py-1 px-2 text-zinc-300 rounded focus:outline-none"
                            />
                          </div>
                          <button
                            onClick={() => {
                              setActiveStep(3);
                              setIsSimulating(false);
                            }}
                            className="w-full btn-primary text-xs py-2 mt-2 flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            Pay with Test Card
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}

                    {currentStep.mockupType === "webhook" && (
                      <div className="w-full max-w-md p-4 bg-zinc-950 rounded-xl border border-zinc-900 font-mono text-[10px] text-zinc-400 text-left select-all">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-900 text-[9px] text-zinc-500">
                          <span>payload: subscription.active</span>
                          <span className="text-emerald-400 font-semibold font-mono">200 RECEIVED</span>
                        </div>
                        <p className="text-amber-500">&#123;</p>
                        <p>&nbsp;&nbsp;<span className="text-sky-400">&quot;event&quot;</span>: <span className="text-emerald-400">&quot;subscription.active&quot;</span>,</p>
                        <p>&nbsp;&nbsp;<span className="text-sky-400">&quot;data&quot;</span>: &#123;</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-sky-400">&quot;subscription_id&quot;</span>: <span className="text-emerald-400">&quot;sub_38a2&quot;</span>,</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-sky-400">&quot;customer_id&quot;</span>: <span className="text-emerald-400">&quot;${profile.customerId}&quot;</span>,</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-sky-400">&quot;status&quot;</span>: <span className="text-emerald-400">&quot;active&quot;</span>,</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-sky-400">&quot;product_id&quot;</span>: <span className="text-emerald-400">&quot;pdt_pro&quot;</span></p>
                        <p>&nbsp;&nbsp;&#125;</p>
                        <p className="text-amber-500">&#125;</p>
                      </div>
                    )}

                    {currentStep.mockupType === "dashboard" && (
                      <div className="w-full max-w-sm p-4 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl text-left relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[30px] pointer-events-none" />
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Account Billing</p>
                            <p className="text-xs font-bold text-zinc-200">{profile.name}</p>
                          </div>
                          <div className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-semibold text-emerald-400">
                            PRO ACTIVE
                          </div>
                        </div>

                        <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-between mb-4">
                          <div>
                            <p className="text-[9px] text-zinc-500">CURRENT PLAN</p>
                            <p className="text-xs font-bold text-[var(--text-primary)]">Pro Subscription</p>
                          </div>
                          <span className="text-[10px] font-bold text-[var(--color-accent-500)]">$29/month</span>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-[10px] text-zinc-500">Need to cancel or update details?</span>
                          <button
                            onClick={() => {
                              alert("In a real app, this redirects to your Dodo secure customer billing portal!");
                            }}
                            className="text-[10px] font-bold text-[var(--color-accent-500)] hover:underline flex items-center gap-1.5 cursor-pointer"
                          >
                            Manage Billing Portal
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

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
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
        >
          <img
            src="/icon.png"
            alt="DoDo Starter"
            className="w-8 h-8 rounded-lg object-contain group-hover:scale-105 transition-transform"
          />
          <span className="gradient-text font-extrabold text-lg tracking-tight">DoDo Starter</span>
        </Link>
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
