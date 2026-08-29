import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — Penetration Tester / Cybersecurity`,
    template: `%s — ${profile.name}`,
  },
  description: profile.intro,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name }],
  keywords: [
    "penetration tester",
    "kiberxavfsizlik",
    "pentest",
    "offensive security",
    "cybersecurity",
    "web application security",
    "HTB CJCA",
    "MITRE ATT&CK",
    "red team",
    profile.name,
  ],
  openGraph: {
    type: "profile",
    title: `${profile.name} — ${profile.roleLine}`,
    description: profile.intro,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.roleLine}`,
    description: profile.intro,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uz" className={`${inter.variable} ${mono.variable} bg-void antialiased`}>
      <body className="bg-void text-fg">{children}</body>
    </html>
  );
}
