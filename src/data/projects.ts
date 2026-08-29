import raw from "@/content/projects.json";

export type Severity = "critical" | "high" | "medium" | "low" | "unrated";

export type CaseChapter = {
  /** "01" … "08" */
  no: string;
  title: string;
  /** What this phase covers in the methodology — general, not target-specific. */
  objective: string;
  /** Target-specific write-up. Empty until the real engagement notes are supplied. */
  content: string;
  /** Target-specific bullet findings. Empty until supplied. */
  points: string[];
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  /** Machine codename — empty while withheld. */
  codename: string;
  category: string;
  targetType: string;
  summary: string;
  /** Optional card image. Empty = no image. */
  cover: string;
  tags: string[];
  severity: Severity;
  cvss: string;
  cwe: string;
  status: string;
  difficulty: string;
  tools: string[];
  mitre: { id: string; name: string; tactic: string }[];
  vulnerabilities: string[];
  chapters: CaseChapter[];
  screenshots: { caption: string; src: string }[];
  reportUrl: string;
  githubUrl: string;
};

export const projects = raw.items as Project[];
export const projectsNote: string = raw.note;

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const severityMeta: Record<Severity, { label: string; className: string }> = {
  critical: { label: "Kritik", className: "text-danger border-danger/40 bg-danger/10" },
  high: { label: "Yuqori", className: "text-warn border-warn/40 bg-warn/10" },
  medium: { label: "O'rta", className: "text-cyan border-cyan/40 bg-cyan/10" },
  low: { label: "Past", className: "text-muted border-line bg-white/5" },
  unrated: { label: "Baholanmagan", className: "text-dim border-line bg-white/[0.03]" },
};

/** Status → chip colour. Unknown statuses fall back to a neutral chip. */
export const statusTone: Record<string, string> = {
  "Chop etilgan": "text-acid border-acid/30 bg-acid/[0.07]",
  "Yuborilgan — ko'rikda": "text-cyan border-cyan/25 bg-cyan/[0.06]",
  Ishlanmoqda: "text-warn border-warn/25 bg-warn/[0.06]",
  Rejada: "text-dim border-line bg-white/[0.02]",
};
