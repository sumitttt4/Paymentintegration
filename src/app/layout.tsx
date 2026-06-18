import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DodoStarter — Ship Paid SaaS in Minutes",
  description:
    "The fastest way to launch a production-ready SaaS with authentication, billing, and subscription management. Powered by Dodo Payments.",
  keywords: [
    "SaaS starter kit",
    "Dodo Payments",
    "Next.js template",
    "subscription billing",
    "payment integration",
  ],
  openGraph: {
    title: "DodoStarter — Ship Paid SaaS in Minutes",
    description:
      "Stop fighting payment integration. Ship a polished, paid SaaS in minutes with DodoStarter.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">

        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
