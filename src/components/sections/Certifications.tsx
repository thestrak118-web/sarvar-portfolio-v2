import { certifications, certificationRoadmap, type Certification } from "@/data/certifications";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ActionLink } from "@/components/ui/ActionLink";
import { ArrowUpRightIcon, ShieldIcon } from "@/components/ui/Icons";
import { EmptyState } from "@/components/ui/EmptyState";

function CredentialRow({ cert }: { cert: Certification }) {
  const { credentialId, verifyUrl } = cert;

  return (
    <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line/60">
      <div className="bg-void px-5 py-4">
        <p className="label">Olingan sana</p>
        <p className="mt-2 font-mono text-[12.5px] text-fg">
          {cert.earned || <span className="text-dim">[ kiritilmagan ]</span>}
        </p>
      </div>
      <div className="bg-void px-5 py-4">
        <p className="label">Credential ID</p>
        <p className="mt-2 font-mono text-[12.5px] text-fg">
          {credentialId || <span className="text-dim">[ kiritilmagan ]</span>}
        </p>
      </div>
      <div className="bg-void px-5 py-4">
        <p className="label">Tekshirish</p>
        <p className="mt-2 font-mono text-[12.5px]">
          {verifyUrl ? (
            <a
              href={verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-acid hover:underline"
            >
              Sertifikatni tekshirish
              <ArrowUpRightIcon className="size-3.5" />
            </a>
          ) : (
            <span className="text-dim">[ havola kiritilmagan ]</span>
          )}
        </p>
      </div>
    </div>
  );
}

export function Certifications({ index = "05" }: { index?: string }) {
  const earned = certifications.filter((cert) => cert.status === "earned");
  const [primary, ...secondary] = earned;
  const hasCertifications = earned.length > 0 || certificationRoadmap.length > 0;

  return (
    <section id="certifications" className="relative scroll-mt-24 border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeading
          index={index}
          eyebrow="Sertifikatlar"
          title="Amaliy va tekshiriladigan."
          description="Amaliy sertifikatlar — test savollari bilan emas, real muhitni buzib va hisobot yozib olinadi."
          aside={
            <div className="rounded-xl border border-line bg-surface px-5 py-4">
              <p className="text-[26px] font-semibold leading-none tracking-[-0.04em] text-fg">
                {earned.length}
              </p>
              <p className="label mt-2">Hack The Box sertifikati</p>
            </div>
          }
        />

        {!hasCertifications ? <EmptyState hint="Sertifikatlar bo'limi" /> : null}

        {/* ── primary certification ─────────────────────────── */}
        {primary ? (
        <Reveal>
          <article className="edge-card mt-14 overflow-hidden rounded-2xl">
            <div className="flex flex-col">
              <div className="relative flex items-center justify-center border-b border-line bg-[radial-gradient(circle_at_50%_40%,rgba(195,255,62,0.09),transparent_65%)] p-10">
                <div className="absolute inset-8 rounded-full border border-white/[0.05]" aria-hidden />
                <div className="absolute inset-16 rounded-full border border-white/[0.04]" aria-hidden />
                <div className="relative text-center">
                  <ShieldIcon className="mx-auto size-6 text-acid" />
                  <p className="mt-4 text-[52px] font-semibold leading-none tracking-[-0.05em] text-fg">
                    {primary.abbr}
                  </p>
                  <p className="label mt-3">{primary.issuer}</p>
                </div>
              </div>

              <div className="p-7 sm:p-9">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-acid/30 bg-acid/[0.07] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-acid">
                    Olingan
                  </span>
                  <span className="label">Professional daraja · amaliy imtihon</span>
                </div>

                <h3 className="mt-5 text-[24px] font-semibold leading-snug tracking-[-0.03em] text-fg sm:text-[28px]">
                  {primary.name}
                </h3>

                <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-muted">
                  {primary.summary}
                </p>

                <ul className="mt-7 flex flex-wrap gap-2">
                  {primary.domains.map((domain) => (
                    <li
                      key={domain}
                      className="rounded-md border border-line bg-white/[0.02] px-2.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted"
                    >
                      {domain}
                    </li>
                  ))}
                </ul>

                <CredentialRow cert={primary} />

                {profile.links.htb.href ? (
                  <div className="mt-6">
                    <ActionLink link={profile.links.htb}>
                      Hack The Box profili
                    </ActionLink>
                  </div>
                ) : null}
              </div>
            </div>
          </article>
        </Reveal>
        ) : null}

        {/* ── further certifications ────────────────────────── */}
        {secondary.map((cert, i) => (
          <Reveal key={cert.abbr} delay={0.05 * i}>
            <article className="edge-card mt-5 rounded-2xl p-7 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div className="flex items-center gap-5">
                  <span className="text-[34px] font-semibold leading-none tracking-[-0.05em] text-fg">
                    {cert.abbr}
                  </span>
                  <span className="h-10 w-px bg-line" aria-hidden />
                  <div>
                    <h3 className="text-[17px] font-medium leading-snug text-fg">{cert.name}</h3>
                    <p className="label mt-2">{cert.issuer}</p>
                  </div>
                </div>
                <span className="rounded-full border border-acid/25 bg-acid/[0.05] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-acid/90">
                  Olingan
                </span>
              </div>

              <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-muted">{cert.summary}</p>

              <CredentialRow cert={cert} />
            </article>
          </Reveal>
        ))}

        {/* ── roadmap ───────────────────────────────────────── */}
        <div className="mt-5 flex flex-col gap-5">
          {certificationRoadmap.map((cert, i) => (
            <Reveal key={cert.abbr} delay={0.05 * i}>
              <div className="h-full rounded-2xl border border-dashed border-line bg-white/[0.012] p-6">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-[26px] font-semibold leading-none tracking-[-0.04em] text-dim">
                    {cert.abbr}
                  </p>
                  <span
                    className={
                      cert.pursuing
                        ? "label text-acid/80"
                        : "label text-dim"
                    }
                  >
                    {cert.pursuing ? "Hozir tayyorlanmoqda" : "Rejada"}
                  </span>
                </div>
                <p className="mt-4 text-[13.5px] leading-snug text-muted">{cert.name}</p>
                <p className="label mt-3">{cert.issuer}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
