import {
  engagements,
  engagementNote,
  experienceHeading,
  experienceDescription,
  hasConfidential,
} from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Placeholder";
import { EmptyState } from "@/components/ui/EmptyState";

export function Experience({ index = "02" }: { index?: string }) {
  return (
    <section id="experience" className="relative scroll-mt-24 border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeading
          index={index}
          eyebrow="Ish tajribasi"
          title={experienceHeading}
          description={experienceDescription}
          aside={
            hasConfidential ? (
              <div className="flex items-center gap-2 rounded-lg border border-dashed border-line px-3 py-2">
                <span className="size-1.5 rounded-full bg-warn/80" aria-hidden />
                <span className="label">Confidential / NDA</span>
              </div>
            ) : undefined
          }
        />

        {engagements.length === 0 ? <EmptyState hint="Ish tajribasi bo'limi" /> : null}

        <div className="mt-16">
          {engagements.map((job) => (
            <article key={job.role} className="relative">
              <div className="flex flex-col gap-10">
                <div>
                  <Reveal>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="label text-acid/80">Hozirgi</span>
                        <span className="h-px w-10 bg-line" aria-hidden />
                      </div>

                      <h3 className="mt-4 text-[26px] font-semibold leading-tight tracking-tight text-fg">
                        {job.role}
                      </h3>

                      <p
                        className={
                          job.organisationPending
                            ? "mt-3 inline-block border-b border-dashed border-line font-mono text-[12.5px] text-dim"
                            : "mt-3 font-mono text-[12.5px] text-muted"
                        }
                        title={job.organisationPending ? "Awaiting real organisation name" : undefined}
                      >
                        {job.organisation}
                      </p>

                      <div className="mt-5 space-y-2.5">
                        <div className="flex items-center gap-2.5">
                          <span className="label w-[64px]">Davr</span>
                          <span
                            className={
                              job.periodPending
                                ? "font-mono text-[12px] text-dim"
                                : "font-mono text-[12px] text-fg"
                            }
                          >
                            {job.period}
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <span className="label w-[64px]">Muddat</span>
                          <span className="font-mono text-[12px] text-fg">{job.mode}</span>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-2">
                        <Tag>Web</Tag>
                        <Tag>Network</Tag>
                        <Tag>Linux</Tag>
                        <Tag>Hisobot</Tag>
                      </div>

                      <p className="mt-6 max-w-sm text-[13.5px] leading-relaxed text-dim">
                        {engagementNote}
                      </p>
                    </div>
                  </Reveal>
                </div>

                <div>
                  <Reveal delay={0.08}>
                    <p className="max-w-3xl border-l border-acid/50 pl-5 text-[15.5px] leading-relaxed text-fg/85">
                      {job.summary}
                    </p>
                  </Reveal>

                  <ol className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line/60">
                    {job.areas.map((area, i) => (
                      <li key={area.title} className="bg-void/95">
                        <Reveal delay={0.02 * i} className="group h-full">
                          <div className="h-full p-5 transition-colors duration-300 hover:bg-surface">
                            <div className="flex items-baseline gap-3">
                              <span className="label text-dim transition-colors duration-300 group-hover:text-acid/80">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <h4 className="text-[14.5px] font-medium leading-snug text-fg">
                                {area.title}
                              </h4>
                            </div>
                            <p className="mt-3 pl-[30px] text-[13.5px] leading-relaxed text-muted">
                              {area.detail}
                            </p>
                          </div>
                        </Reveal>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
