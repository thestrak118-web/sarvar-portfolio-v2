import Link from "next/link";
import { projects, projectsNote } from "@/data/projects";
import { ArrowIcon } from "@/components/ui/Icons";

const capabilityTags = [
  "WEB", "NETWORK", "LINUX", "WINDOWS", "PRIVESC", "EXPLOITATION", "RECON", "REPORTING",
];
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProjectCard } from "./ProjectCard";

export function SecurityWork({
  index = "",
  preview = false,
  limit = 3,
}: {
  index?: string;
  /** Landing-page mode: a few cards plus a link to the full page. */
  preview?: boolean;
  limit?: number;
}) {
  const shown = preview ? projects.slice(0, limit) : projects;
  return (
    <section id="work" className="relative scroll-mt-24 border-t border-line py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-lines opacity-40" aria-hidden />

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeading
          index={index}
          eyebrow="Security Work"
          title="Security Work"
          // Bosh sahifadagi qisqa ko'rinishda izoh va "5+" kartasi ko'rsatilmaydi —
          // ular to'liq /work sahifasida qoladi.
          description={preview ? undefined : projectsNote}
          aside={
            preview ? undefined : (
              <div className="rounded-xl border border-line bg-surface px-5 py-4">
                <p className="text-[26px] font-semibold leading-none tracking-[-0.04em] text-fg">
                  {projects.length}
                </p>
                <p className="label mt-2">Offensive Security assessment</p>
              </div>
            )
          }
        />

        {projects.length === 0 ? <EmptyState hint="Loyihalar bo'limi" /> : null}

        {/* qobiliyat lentasi */}
        <Reveal delay={0.1}>
          <div
            className="mt-10 overflow-hidden border-y border-line py-3 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]"
            aria-hidden
          >
            <div className="marquee-track flex w-max gap-8">
              {[...capabilityTags, ...capabilityTags, ...capabilityTags, ...capabilityTags].map(
                (tag, i) => (
                  <span
                    key={`${tag}-${i}`}
                    className="font-mono text-[11px] tracking-[0.22em] text-faint"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>
        </Reveal>

        {/* bosh sahifada kartalar ko'rsatilmaydi — ular /work sahifasida */}
        <div className={preview ? "hidden" : "mt-12 flex flex-col gap-5"}>
          {shown.map((project, i) => (
            <Reveal
              key={project.slug}
              delay={0.05 * (i % 3)}
              className=""
            >
              <ProjectCard project={project} featured={!preview} />
            </Reveal>
          ))}
        </div>

        {preview ? (
          <Reveal delay={0.1}>
            <div className="mt-10 flex justify-center">
              <Link
                href="/work"
                className="group inline-flex h-11 items-center gap-2.5 rounded-[10px] border border-line bg-white/[0.02] px-5 text-[13px] text-fg transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.05]"
              >
                Barcha {projects.length} ta assessment
                <ArrowIcon className="size-4 text-acid transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
