import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { severityMeta } from "@/data/projects";
import { workHref } from "@/data/layout";
import { Reveal } from "@/components/ui/Reveal";
import { Placeholder, Tag } from "@/components/ui/Placeholder";
import { ArrowIcon, ArrowUpRightIcon } from "@/components/ui/Icons";
import { ChapterNav } from "./ChapterNav";
import { cn } from "@/lib/utils";

function MetaRow({ label, value, pending }: { label: string; value: string; pending?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line/70 py-3 last:border-b-0">
      <dt className="label">{label}</dt>
      <dd
        className={cn(
          "text-right font-mono text-[12.5px]",
          pending ? "text-dim" : "text-fg",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

export function CaseStudy({
  project,
  prev,
  next,
}: {
  project: Project;
  prev: Project;
  next: Project;
}) {
  const severity = severityMeta[project.severity];

  return (
    <article className="relative pb-24 pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] grid-lines mask-fade-b opacity-60" aria-hidden />

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        {/* ── document header ─────────────────────────────── */}
        <Reveal>
          <Link
            href={workHref}
            className="inline-flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-fg"
          >
            <ArrowIcon className="size-4 rotate-180" />
            Barcha ishlar
          </Link>
        </Reveal>

        <header className="mt-10 border-b border-line pb-12">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[11px] tracking-[0.16em] text-acid/80">
                CASE STUDY {project.index}
              </span>
              <span className="size-1 rounded-full bg-line" aria-hidden />
              <span className="label">{project.category}</span>
              <span
                className={cn(
                  "rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]",
                  severity.className,
                )}
              >
                Xavflilik: {severity.label}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-6 max-w-3xl text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.03] tracking-[-0.045em] text-fg">
              {project.title}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-[15.5px] leading-relaxed text-muted">
              {project.summary}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </Reveal>
        </header>

        {/* ── report meta ─────────────────────────────────── */}
        <div className="mt-12 flex flex-col gap-5">
          <Reveal>
            <div className="edge-card rounded-2xl p-6">
              <p className="label border-b border-line pb-3">Assessment ma&rsquo;lumotlari</p>
              <dl className="mt-2">
                <MetaRow label="Kod nomi" value={project.codename || "[ oshkor qilinmagan ]"} pending={!project.codename} />
                <MetaRow label="Nishon" value={project.targetType} />
                <MetaRow label="Holat" value={project.status} />
                <MetaRow label="Qiyinlik" value={project.difficulty} pending />
                <MetaRow label="CVSS v3.1" value={project.cvss || "[ baholanmagan ]"} pending={!project.cvss} />
                <MetaRow label="CWE" value={project.cwe || "[ berilmagan ]"} pending={!project.cwe} />
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="edge-card h-full rounded-2xl p-6">
              <p className="label border-b border-line pb-3">Vositalar</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {project.tools.map((tool) => (
                  <li key={tool}>
                    <Tag>{tool}</Tag>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[12.5px] leading-relaxed text-dim">
                Ro&rsquo;yxatdagi vositalar shu turdagi nishon uchun standart to&rsquo;plam. Aynan shu mashinaga ishlatilgan buyruqlar walkthrough bilan chop etiladi.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="edge-card h-full rounded-2xl p-6">
              <p className="label border-b border-line pb-3">Natijalar</p>
              <ul className="mt-4 space-y-3">
                {[
                  ["Texnik walkthrough", project.reportUrl],
                  ["Lab manbasi (build)", project.githubUrl],
                ].map(([label, url]) => (
                  <li key={label} className="flex items-center justify-between gap-3">
                    <span className="text-[13.5px] text-muted">{label}</span>
                    {url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-[12px] text-acid hover:underline"
                      >
                        Ochish
                        <ArrowUpRightIcon className="size-3.5" />
                      </a>
                    ) : (
                      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-dim">
                        havola yo&rsquo;q
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[12.5px] leading-relaxed text-dim">
                Havolalar Offensive Security ko&rsquo;rigi tugagach chop etiladi.
              </p>
            </div>
          </Reveal>
        </div>

        {/* ── phases ───────────────────────────────────────── */}
        <div className="mt-16 flex flex-col gap-10">
          <div>
            <ChapterNav chapters={project.chapters} />
          </div>

          <div>
            {project.chapters.map((chapter) => (
              <section
                key={chapter.no}
                id={`phase-${chapter.no}`}
                className="scroll-mt-28 border-t border-line py-10 first:border-t-0 first:pt-0"
              >
                <Reveal>
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[13px] tracking-[0.14em] text-acid/80">
                      {chapter.no}
                    </span>
                    <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-fg">
                      {chapter.title}
                    </h2>
                  </div>
                </Reveal>

                <Reveal delay={0.05}>
                  <p className="mt-5 max-w-2xl text-[14.5px] leading-relaxed text-muted">
                    {chapter.objective}
                  </p>
                </Reveal>

                {chapter.content ? (
                  <Reveal delay={0.08}>
                    <div className="mt-6 max-w-2xl text-[14.5px] leading-relaxed text-fg/85">
                      {chapter.content}
                    </div>
                  </Reveal>
                ) : chapter.no === "01" ? (
                  <Reveal delay={0.08}>
                    <Placeholder
                      className="mt-6 max-w-2xl"
                      label={`${chapter.no}-bosqich · topilmalar kutilmoqda`}
                      hint="Engagement yozuvlari mashina bilan birga chop etiladi. Bu hisobotga amalda bajarilmagan hech narsa yozilmaydi."
                    />
                  </Reveal>
                ) : (
                  <Reveal delay={0.08}>
                    <div className="mt-6 flex max-w-2xl flex-wrap items-center justify-between gap-3 rounded-lg border border-dashed border-line px-4 py-3">
                      <span className="label">{chapter.no}-bosqich · topilmalar kutilmoqda</span>
                      <span className="font-mono text-[11px] text-dim">
                        mashina bilan chop etiladi
                      </span>
                    </div>
                  </Reveal>
                )}

                {chapter.points.length > 0 ? (
                  <ul className="mt-6 max-w-2xl space-y-2.5">
                    {chapter.points.map((point) => (
                      <li key={point} className="flex gap-3 text-[14px] leading-relaxed text-muted">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-acid/70" aria-hidden />
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            {/* Findings */}
            <section className="scroll-mt-28 border-t border-line py-10">
              <Reveal>
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[13px] tracking-[0.14em] text-acid/80">FIND</span>
                  <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-fg">
                    Zaiflik sinflari
                  </h2>
                </div>
              </Reveal>

              {project.vulnerabilities.length > 0 ? (
                <ul className="mt-6 grid max-w-2xl gap-px overflow-hidden rounded-xl border border-line bg-line/60">
                  {project.vulnerabilities.map((item) => (
                    <li key={item} className="bg-void px-5 py-4 text-[13.5px] text-fg">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <Reveal delay={0.06}>
                  <div className="mt-6 flex max-w-2xl flex-wrap items-center justify-between gap-3 rounded-lg border border-dashed border-line px-4 py-3">
                    <span className="label">Topilmalar chop etilgunicha yopiq</span>
                    <span className="font-mono text-[11px] text-dim">taxmin yozilmaydi</span>
                  </div>
                </Reveal>
              )}
            </section>

            {/* MITRE ATT&CK */}
            <section className="scroll-mt-28 border-t border-line py-10">
              <Reveal>
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[13px] tracking-[0.14em] text-acid/80">ATT&amp;CK</span>
                  <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-fg">
                    MITRE texnikalari
                  </h2>
                </div>
              </Reveal>

              {project.mitre.length > 0 ? (
                <div className="mt-6 overflow-hidden rounded-xl border border-line">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-line bg-white/[0.02]">
                        <th className="label px-4 py-3">ID</th>
                        <th className="label px-4 py-3">Texnika</th>
                        <th className="label px-4 py-3">Taktika</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.mitre.map((technique) => (
                        <tr key={technique.id} className="border-b border-line/60 last:border-b-0">
                          <td className="px-4 py-3 font-mono text-[12.5px] text-acid">{technique.id}</td>
                          <td className="px-4 py-3 text-[13.5px] text-fg">{technique.name}</td>
                          <td className="px-4 py-3 text-[13.5px] text-muted">{technique.tactic}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <Reveal delay={0.06}>
                  <Placeholder
                    className="mt-6 max-w-2xl"
                    label="Texnikalar bog'lanishi kutilmoqda"
                    hint="Yakuniy hisobotdagi har bir topilma ATT&CK taktikasi va texnika ID&rsquo;siga bog&rsquo;lanadi. ID&rsquo;lar real engagement yozuvlaridan olinadi — taxmin qilinmaydi."
                    lines={4}
                  />
                </Reveal>
              )}
            </section>

            {/* Evidence */}
            <section className="scroll-mt-28 border-t border-line py-10">
              <Reveal>
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[13px] tracking-[0.14em] text-acid/80">EVID</span>
                  <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-fg">Dalillar</h2>
                </div>
              </Reveal>

              <div className="mt-6 flex flex-col gap-4">
                {project.screenshots.map((shot, i) => (
                  <Reveal key={shot.caption} delay={0.04 * i}>
                    <figure>
                      {shot.src ? (
                        <div className="relative aspect-video overflow-hidden rounded-xl border border-line bg-surface">
                          <Image
                            src={shot.src}
                            alt={shot.caption}
                            fill
                            sizes="(max-width: 768px) 100vw, 360px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="placeholder-block flex aspect-video items-center justify-center rounded-xl">
                          <span className="label text-dim">Skrinshot {i + 1}</span>
                        </div>
                      )}
                      <figcaption className="label mt-3">{shot.caption}</figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* ── prev / next ──────────────────────────────────── */}
        <nav
          aria-label="Case study navigatsiyasi"
          className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line/60"
        >
          <Link href={`/work/${prev.slug}`} className="group bg-void p-6 transition-colors hover:bg-surface">
            <span className="label">Oldingi</span>
            <p className="mt-3 text-[16px] font-medium text-fg">{prev.title}</p>
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="group bg-void p-6 text-right transition-colors hover:bg-surface"
          >
            <span className="label">Keyingi</span>
            <p className="mt-3 text-[16px] font-medium text-fg">{next.title}</p>
          </Link>
        </nav>
      </div>
    </article>
  );
}
