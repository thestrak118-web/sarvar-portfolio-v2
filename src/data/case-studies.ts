import { projects as legacyProjects } from "./projects";

export type CaseStudyRecord = {
  slug: string;
  title: string;
  category: "Production" | "Tooling" | "Lab" | "Reporting";
  role: string;
  period: string;
  challenge: string;
  result: string;
  summary: string;
  technologies: string[];
  flow: string[];
  finding: string;
  impact: string;
  evidence: string[];
  evidenceLabel: string;
  remediation: string[];
  outcome: string;
  cvss?: string;
  github?: string;
  review?: boolean;
};

import rawStudies from "@/content/case-studies.json";
export const selectedStudies = (rawStudies.items as CaseStudyRecord[]).filter(
  (study) => !study.review,
);

export const reviewStudies: CaseStudyRecord[] = legacyProjects
  .filter((p) => p.slug !== "security-automation-scripts")
  .map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.slug.includes("assessments") ? "Lab" : "Reporting",
    role: "Mustaqil xavfsizlik tadqiqotchisi",
    period: "2025–hozirgacha",
    challenge: p.summary,
    result: "Materiallar tayyorlanmoqda",
    summary: p.summary,
    technologies: p.tools,
    flow: [],
    finding: "",
    impact: "",
    evidence: [],
    evidenceLabel: "",
    remediation: [],
    outcome: "",
    review: true,
  }));
export const allStudies = [
  ...(rawStudies.items as CaseStudyRecord[]),
  ...reviewStudies,
];
export const getStudy = (slug: string) =>
  allStudies.find((item) => item.slug === slug);

export const capabilities = [
  {
    title: "Web Application Security",
    text: "Autentifikatsiya, ruxsat nazorati, API va ma'lumotlar himoyasi.",
    tools: "Burp Suite · OWASP WSTG",
    href: "/work/authentication-assessment",
  },
  {
    title: "Network Assessment",
    text: "Hostlar, portlar va servislarni aniqlash; hujum yuzasini xaritalash.",
    tools: "Nmap · DNS · Linux",
    href: "/experience",
  },
  {
    title: "Privilege Escalation",
    text: "SUID, sudo va noto'g'ri ruxsatlar orqali ta'sir ko'lamini tekshirish.",
    tools: "LinPEAS · GTFOBins",
    href: "/experience",
  },
  {
    title: "Security Automation",
    text: "Takroriy tekshiruv, wordlist va servis aniqlashni avtomatlashtirish.",
    tools: "Python · Bash · Go",
    href: "/work/security-automation-scripts",
  },
  {
    title: "Reporting & Remediation",
    text: "CVSS bahosi, qayta tekshirish qadamlari va muhandislar uchun tuzatish rejasi.",
    tools: "CVSS 3.1 · MITRE ATT&CK",
    href: "/experience",
  },
  {
    title: "QA & Release Security",
    text: "Funksional va regression sinovlarni xavfsizlik tekshiruvlari bilan birlashtirish.",
    tools: "Test cases · Retest · Release QA",
    href: "/experience",
  },
];
