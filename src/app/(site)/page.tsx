import { Fragment, type ReactNode } from "react";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { SecurityWork } from "@/components/sections/SecurityWork";
import { Skills } from "@/components/sections/Skills";
import { Certifications } from "@/components/sections/Certifications";
import { Statistics } from "@/components/sections/Statistics";
import { Research } from "@/components/sections/Research";
import { SocialProof } from "@/components/sections/SocialProof";
import { Contact } from "@/components/sections/Contact";
import { homeNumbers, homeSections, type SectionId } from "@/data/layout";

/**
 * Landing page. Which sections appear here — and which live on their own
 * route instead — is set in `src/content/layout.json` (admin panel).
 */
const registry: Record<SectionId, (index: string) => ReactNode> = {
  work: (index) => <SecurityWork index={index} preview />,
  experience: (index) => <Experience index={index} />,
  skills: (index) => <Skills index={index} />,
  certifications: (index) => <Certifications index={index} />,
  statistics: () => <Statistics />,
  about: (index) => <About index={index} />,
  research: (index) => <Research index={index} />,
  social: (index) => <SocialProof index={index} />,
  contact: (index) => <Contact index={index} />,
};

export default function Home() {
  return (
    <>
      <Hero />
      {homeSections.map((item) => (
        <Fragment key={item.id}>{registry[item.id](homeNumbers[item.id] ?? "")}</Fragment>
      ))}
    </>
  );
}
