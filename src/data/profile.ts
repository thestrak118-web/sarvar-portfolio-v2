/**
 * Identity, links and headline numbers.
 *
 * Every value comes from the editable content files in `src/content` — change
 * them in the local admin panel (`npm run dev` → /admin) or by hand. Nothing is
 * invented here: unfilled values render as clearly-marked placeholders.
 */
import raw from "@/content/profile.json";
import links from "@/content/links.json";

export type ExternalLink = {
  label: string;
  href: string;
  handle: string;
};

export type IntroPart = { text: string; accent: boolean };

export const profile = {
  ...raw,
  introParts: raw.introParts as IntroPart[],
  headline: [raw.headlineLine1, raw.headlineLine2] as [string, string],
  links: {
    github: { label: "GitHub", href: links.github, handle: "" } as ExternalLink,
    linkedin: { label: "LinkedIn", href: links.linkedin, handle: "" } as ExternalLink,
    email: {
      label: "Email",
      href: links.email ? `mailto:${links.email}` : "",
      handle: links.email,
    } as ExternalLink,
    htb: { label: "Hack The Box", href: links.htb, handle: "" } as ExternalLink,
  },
};

/** Technical profile card — the spec sheet in the About section. */
export const profileSpec: { key: string; value: string }[] = raw.spec;

export const heroMetrics: {
  value: string;
  label: string;
  hint: string;
  /** Bo'sh bo'lsa katakcha bosilmaydi. */
  href?: string;
}[] = raw.heroMetrics;

export const statistics: {
  value: number;
  suffix: string;
  label: string;
  detail: string;
}[] = raw.statistics;
