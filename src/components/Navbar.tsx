"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { Zap, LogOut, LayoutDashboard } from "lucide-react";

export function Navbar() {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg group"
          id="nav-logo"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-brand-500)] to-[var(--color-accent-500)] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="gradient-text">DodoStarter</span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/#features"
            className={`text-sm font-medium transition-colors hover:text-[var(--color-accent-500)] ${
              pathname === "/" ? "text-[var(--text-secondary)]" : "text-[var(--text-muted)]"
            }`}
          >
            Features
          </Link>
          <Link
            href="/#pricing"
            className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--color-accent-500)] transition-colors"
          >
            Pricing
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">

          {isPending ? (
            <div className="w-20 h-9 rounded-lg bg-[var(--border)] animate-pulse" />
          ) : session?.user ? (
            <div className="flex items-center gap-2">
              <Link href="/dashboard" className="btn-secondary text-sm py-2 px-4" id="nav-dashboard">
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="p-2 rounded-lg border border-[var(--border)] hover:border-red-400 
                  hover:text-red-400 transition-all text-[var(--text-muted)] cursor-pointer"
                aria-label="Sign out"
                id="nav-signout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn-primary text-sm py-2 px-5" id="nav-login">
              Get Started
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
