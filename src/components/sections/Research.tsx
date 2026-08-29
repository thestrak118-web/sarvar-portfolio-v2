import { researchTracks } from "@/data/research";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRightIcon } from "@/components/ui/Icons";

export function Research({ index = "06" }: { index?: string }) {
  return (
    <section id="research" className="relative scroll-mt-24 border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeading
          index={index}
          eyebrow="Tadqiqot"
          title="Tadqiqot yo'nalishlari."
          description="Davom etayotgan yo'nalishlar. Maqolalar tayyor bo'lgani sari shu yerda chiqadi — mavjud bo'lmagan narsa yozilmaydi."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line/60">
          {researchTracks.map((track, i) => (
            <Reveal key={track.id} delay={0.04 * i} className="bg-void">
              <article className="group flex h-full flex-col p-7 transition-colors duration-500 hover:bg-surface">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-[0.16em] text-acid/70">
                    {track.code}
                  </span>
                  <span className="label">{track.focus}</span>
                </div>

                <h3 className="mt-6 text-[19px] font-semibold leading-snug tracking-[-0.025em] text-fg">
                  {track.title}
                </h3>

                <p className="mt-4 text-[13.5px] leading-relaxed text-muted">{track.description}</p>

                <div className="mt-auto pt-7">
                  {track.articles.length > 0 ? (
                    <ul className="space-y-2">
                      {track.articles.map((article) => (
                        <li key={article.url}>
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[13px] text-fg hover:text-acid"
                          >
                            {article.title}
                            <ArrowUpRightIcon className="size-3.5" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex items-center gap-2.5 border-t border-line pt-4">
                      <span className="size-1.5 rounded-full bg-faint" aria-hidden />
                      <span className="label">Maqola hali chop etilmagan</span>
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}

          {/* balance the grid with a quiet closing tile */}
          <Reveal delay={0.2} className="bg-void">
            <div className="flex h-full flex-col justify-between p-7">
              <span className="label text-dim">RS-XX</span>
              <p className="mt-6 max-w-xs text-[14px] leading-relaxed text-dim">
                Yangi tadqiqot tayyor bo&rsquo;lgach qo&rsquo;shiladi. Bu yerda haqiqatan menga tegishli va chop etilgan bo&rsquo;lmagan CVE, topilma yoki advisory yozilmaydi.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
