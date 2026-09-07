import Image from "next/image";
import { profile, profileSpec } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ShieldIcon } from "@/components/ui/Icons";

export function About({ index = "01" }: { index?: string }) {
  return (
    <section id="about" className="relative scroll-mt-24 border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeading
          index={index}
          eyebrow="Men haqimda"
          title="Hujumlar ortida."
          description="Ish aslida nimadan iborat — motivatsion gaplarsiz, to'qib chiqarilgan tarixsiz."
        />

        <div className="mt-16 flex flex-col gap-12">
          <div>
            <div className="max-w-3xl space-y-6">
              {profile.bio.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p className="text-[16px] leading-[1.75] text-muted first:text-[17px] first:text-fg/85">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-8">
                {[
                  ["Offensive security", "Avval attack surface"],
                  ["Linux", "Kali · kundalik tizim"],
                  ["Hisobot", "Tuzatadigan muhandis uchun"],
                ].map(([title, detail]) => (
                  <div key={title}>
                    <p className="text-[14px] font-medium text-fg">{title}</p>
                    <p className="label mt-1.5">{detail}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ── technical profile card ───────────────────────── */}
          <div>
            <Reveal delay={0.1}>
              <div>
                {profile.photo ? (
                  <figure className="mb-5 max-w-md overflow-hidden rounded-2xl border border-line bg-surface">
                    <Image
                      src={profile.photo}
                      alt={profile.name}
                      width={640}
                      height={640}
                      sizes="(max-width: 1024px) 100vw, 420px"
                      className="aspect-[4/3] w-full object-cover grayscale-[40%] transition-[filter] duration-700 hover:grayscale-0"
                      priority={false}
                    />
                  </figure>
                ) : null}
              <div className="edge-card rounded-2xl p-6 sm:p-7">
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <div className="flex items-center gap-2.5">
                    <ShieldIcon className="size-4 text-acid" />
                    <span className="font-mono text-[11px] tracking-[0.16em] text-fg uppercase">
                      Profile.spec
                    </span>
                  </div>
                  <span className="label text-acid/80">tasdiqlangan</span>
                </div>

                <dl className="mt-5 space-y-0">
                  {profileSpec.map((row) => (
                    <div
                      key={row.key}
                      className="group flex items-baseline gap-3 border-b border-line/60 py-3 last:border-b-0"
                    >
                      <dt className="label w-[92px] shrink-0">{row.key}</dt>
                      <dd className="flex flex-1 items-baseline gap-3">
                        <span className="h-px flex-1 translate-y-[-2px] bg-line/70" aria-hidden />
                        <span className="text-right font-mono text-[12.5px] text-fg">
                          {row.value}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 rounded-xl border border-line bg-void/60 p-4">
                  <p className="font-mono text-[11.5px] leading-relaxed text-dim">
                    <span className="text-acid">›</span> engagement_output = report(
                    <span className="text-cyan">findings</span>, mitre_attack, remediation)
                  </p>
                </div>
              </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
