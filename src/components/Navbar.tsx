"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          id="nav-logo"
        >
          <Image
            src="/icon.png"
            alt="DoDo Starter"
            width={32}
            height={32}
            className="rounded-lg object-contain group-hover:scale-105 transition-transform"
          />
          <span className="gradient-text font-extrabold text-lg tracking-tight">DoDo Starter</span>
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
            href="/#demo"
            className={`text-sm font-medium transition-colors hover:text-[var(--color-accent-500)] ${
              pathname === "/" ? "text-[var(--text-secondary)]" : "text-[var(--text-muted)]"
            }`}
          >
            Interactive Demo
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/sumitttt4/Paymentintegration"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm py-2 px-5"
            id="nav-github"
          >
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
}
