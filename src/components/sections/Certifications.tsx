import { certifications, certificationRoadmap } from "@/data/certifications";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { EmptyState } from "@/components/ui/EmptyState";
import Image from "next/image";
import { ArrowUpRightIcon } from "@/components/ui/Icons";

type Row = {
  abbr: string;
  name: string;
  issuer: string;
  earned: string;
  credentialId: string;
  verifyUrl: string;
  domains: string[];
  image: string;
  status: "earned" | "pursuing" | "planned";
};

export function Certifications({ index = "" }: { index?: string }) {
  const rows: Row[] = [
    ...certifications.map((cert) => ({ ...cert, status: "earned" as const })),
    ...certificationRoadmap.map((cert) => ({
      abbr: cert.abbr,
      name: cert.name,
      issuer: cert.issuer,
      earned: "",
      credentialId: "",
      verifyUrl: "",
      domains: [] as string[],
      image: "",
      status: (cert.pursuing ? "pursuing" : "planned") as Row["status"],
    })),
  ];

  const earnedCount = certifications.length;

  return (
    <section id="certifications" className="relative scroll-mt-24 border-t border-line py-16 sm:py-20">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeading
          index={index}
          eyebrow="Sertifikatlar"
          title="Amaliy va tekshiriladigan."
          description="Amaliy sertifikatlar — test savollari bilan emas, real muhitni buzib va hisobot yozib olinadi."
          aside={
            <div className="rounded-xl border border-line bg-surface px-5 py-4">
              <p className="text-[26px] font-semibold leading-none tracking-[-0.04em] text-fg">
                {earnedCount}
              </p>
              <p className="label mt-2">Olingan sertifikat</p>
            </div>
          }
        />

        {rows.length === 0 ? <EmptyState hint="Sertifikatlar bo'limi" /> : null}

        <ul className="mt-12 flex flex-col gap-3">
          {rows.map((row, i) => (
            <Reveal key={`${row.abbr}-${i}`} delay={0.04 * i} as="li">
              <article className="edge-card group rounded-xl px-6 py-5 transition-colors duration-300 hover:bg-elevated">
                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3
                        className={
                          row.status === "earned"
                            ? "text-[20px] font-semibold tracking-[-0.02em] text-fg"
                            : "text-[20px] font-semibold tracking-[-0.02em] text-muted"
                        }
                      >
                        {row.abbr}
                      </h3>
                      {row.earned ? (
                        <span className="label text-dim">{row.earned}</span>
                      ) : null}
                    </div>

                    <p className="mt-2 text-[13.5px] leading-snug text-muted">{row.name}</p>

                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="label">{row.issuer}</span>
                      {row.credentialId ? (
                        <span className="font-mono text-[11px] text-dim">
                          {row.credentialId}
                        </span>
                      ) : null}
                      {row.verifyUrl ? (
                        <a
                          href={row.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-[11px] text-acid hover:underline"
                        >
                          Tekshirish
                          <ArrowUpRightIcon className="size-3" />
                        </a>
                      ) : null}
                    </div>

                    {row.domains.length > 0 ? (
                      <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-dim">
                        {row.domains.join(" · ")}
                      </p>
                    ) : null}
                  </div>

                  {row.image ? (
                    <a
                      href={row.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 overflow-hidden rounded-lg border border-line transition-colors duration-300 hover:border-acid/50"
                      aria-label={`${row.abbr} sertifikati — to'liq ko'rish`}
                    >
                      <Image
                        src={row.image}
                        alt={`${row.abbr} sertifikati`}
                        width={734}
                        height={522}
                        sizes="220px"
                        className="h-[124px] w-[176px] object-cover"
                      />
                    </a>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
