import { Hero, Work, Experience, Skills, Certifications, About } from "@/components/portfolio/Portfolio";
import { Workflow } from "@/components/portfolio/Interactive";
import { pageMetadata } from "@/lib/site-metadata";
import { homeSections } from "@/data/layout";
export const metadata = pageMetadata("Sarvar Tolipov | Penetration Tester", "Web va tarmoq xavfsizligi: PTES / OWASP WSTG asosida sinov, dalil va tuzatish rejasi. ASOS IT, 10+ production loyiha va 20+ laboratoriya sinovi.", "/");
export default function Home() {
  const registry: Record<string, React.ReactNode> = { work: <><Work /><Workflow /></>, experience: <Experience />, skills: <Skills />, certifications: <Certifications />, about: <About /> };
  return <><Hero />{homeSections.map(section => <div key={section.id}>{registry[section.id]}</div>)}</>;
}
