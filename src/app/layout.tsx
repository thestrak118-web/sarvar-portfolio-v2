import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site-metadata";

const inter = localFont({
  src: "../../public/fonts/inter-latin.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});

const mono = localFont({
  src: "../../public/fonts/jetbrains-mono-latin.woff2",
  weight: "400",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
  themeColor: "#070907",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uz" className={`${inter.variable} ${mono.variable} bg-void antialiased`}>
      <body className="bg-void text-fg">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "Person", name: profile.name,
          url: siteUrl, image: `${siteUrl}${profile.photo}`, jobTitle: profile.role,
          sameAs: [profile.links.github.href, profile.links.linkedin.href, profile.links.telegram.href],
          knowsAbout: ["Penetration testing", "Web application security", "Security automation"],
        }).replace(/</g, "\\u003c") }} />
        {children}
      </body>
    </html>
  );
}
