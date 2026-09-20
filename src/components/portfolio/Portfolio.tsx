import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { profile } from "@/data/profile";
import { engagements } from "@/data/experience";
import { certifications, certificationRoadmap } from "@/data/certifications";
import {
  selectedStudies,
  reviewStudies,
  capabilities,
  type CaseStudyRecord,
} from "@/data/case-studies";
import {
  ArrowIcon,
  ArrowUpRightIcon,
  TelegramIcon,
  MailIcon,
  DocumentIcon,
  GitHubIcon,
  LinkedInIcon,
} from "@/components/ui/Icons";
import { ProofConsole, HeroGrid, MagneticLink } from "./Interactive";
import { SampleOutput } from "./SampleOutput";

type SectionProps = { page?: boolean };
export function SectionTitle({
  number,
  label,
  title,
  page = false,
  children,
}: {
  number?: string;
  label: string;
  title: string;
  page?: boolean;
  children?: ReactNode;
}) {
  const Heading = page ? "h1" : "h2";
  return (
    <div className="v2-section-head">
      <div>
        <p className="v2-kicker">
          {number && `${number} / `}
          {label}
        </p>
        <Heading>{title}</Heading>
      </div>
      {children}
    </div>
  );
}

export function Hero() {
  return (
    <section className="v2-hero">
      <HeroGrid />
      <div className="v2-shell">
        <div className="v2-hero-top">
          <p>
            {profile.name}
            <span>{profile.role}</span>
          </p>
          <span className="v2-availability">
            <i />
            {profile.available ? "Takliflarga ochiq" : "Hozir band"}
          </span>
        </div>
        <h1>
          {profile.headline[0]}
          <br />
          <span>{profile.headline[1]}</span>
        </h1>
        <div className="v2-hero-bottom">
          <p>
            Web va tarmoq xavfsizligi. Boshqariladigan sinov, aniq dalil va
            tuzatish rejasi.
            <span>
              PTES / OWASP WSTG · Penetration testing · Security automation
            </span>
          </p>
          <div className="v2-actions">
            <MagneticLink href="/work" className="v2-button primary">
              Case studylarni ko’rish <ArrowIcon />
            </MagneticLink>
            <a
              href={profile.links.telegram.href}
              className="v2-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TelegramIcon /> Telegramda bog’lanish
            </a>
          </div>
        </div>
        <ProofConsole />
        <dl className="v2-metrics">
          {[
            ["10+", "Production loyiha", "/experience"],
            ["20+", "Laboratoriya sinovi", "/experience"],
            [
              "3",
              "Kritik topilma / bitta audit",
              "/work/saas-security-assessment",
            ],
            [
              "~4 soat → 90 daq",
              "Enumeration vaqti",
              "/work/security-automation-scripts",
            ],
          ].map(([value, label, href]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>
                <Link prefetch={false} href={href}>
                  {value}
                </Link>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Evidence({
  study,
  compact = false,
}: {
  study: CaseStudyRecord;
  compact?: boolean;
}) {
  const tool = study.category === "Tooling";
  return (
    <figure className={`v2-evidence ${tool ? "tool" : ""}`}>
      <figcaption>
        <span className="v2-mono">
          {tool ? "RECONTOOL / CLI" : "AUDIT / REDACTED"}
        </span>
        <span>{tool ? "--help" : "Xulosa"}</span>
      </figcaption>
      {tool ? (
        <pre>
          <code>
            {study.evidence.slice(0, compact ? 4 : undefined).join("\n")}
          </code>
        </pre>
      ) : (
        <div className="v2-report-preview">
          <span className="v2-severity">CRITICAL</span>
          <strong>
            {study.cvss}
            <small>CVSS 3.1</small>
          </strong>
          <div
            className="v2-redacted"
            role="img"
            aria-label="Mijoz va endpoint ma’lumotlari yashirilgan"
          >
            <span />
            <span />
          </div>
          <p>{study.evidence[0]}</p>
        </div>
      )}
      <p className="v2-evidence-caption">{study.evidenceLabel}</p>
    </figure>
  );
}

export function Work({ page = false }: SectionProps) {
  const ItemHeading = page ? "h2" : "h3";
  return (
    <section className={`v2-band ${page ? "v2-page" : ""}`} id="work">
      <div className="v2-shell">
        <SectionTitle
          number={page ? undefined : "01"}
          label="TANLANGAN ISHLAR"
          title="Da’vodan ko’ra dalil."
          page={page}
        >
          <p>
            Real loyihalar. Aniq ta’sir.
            <br />
            Maxfiy tafsilotlar oshkor qilinmaydi.
          </p>
        </SectionTitle>
        <div className="v2-project-list">
          {selectedStudies.map((study, i) => (
            <article key={study.slug} className="v2-project">
              <div className="v2-project-copy">
                <div className="v2-project-meta">
                  <span className="v2-mono">0{i + 1}</span>
                  <span className="v2-category">{study.category}</span>
                  <span className="v2-mono">{study.role}</span>
                </div>
                <ItemHeading>
                  <Link prefetch={false} href={`/work/${study.slug}`}>
                    {study.title}
                  </Link>
                </ItemHeading>
                <p>{study.challenge}</p>
                <p className="v2-result">{study.result}</p>
                <ul className="v2-tags">
                  {study.technologies.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <Link
                  prefetch={false}
                  className="v2-text-link"
                  href={`/work/${study.slug}`}
                >
                  Case studyni ko’rish <ArrowUpRightIcon />
                </Link>
              </div>
              <Link
                prefetch={false}
                href={`/work/${study.slug}`}
                className="v2-evidence-link"
              >
                <Evidence study={study} compact />
              </Link>
            </article>
          ))}
        </div>
        {page && (
          <div className="v2-review">
            <h2>Materiallar tayyorlanmoqda</h2>
            <p>
              Alohida walkthrough va hisobotlar tekshirilgach e’lon qilinadi.
            </p>
            {reviewStudies.map((study) => (
              <Link
                prefetch={false}
                key={study.slug}
                href={`/work/${study.slug}`}
              >
                <span>{study.title}</span>
                <span className="v2-status">
                  Tayyorlanmoqda <ArrowUpRightIcon />
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function Experience({ page = false }: SectionProps) {
  const jobs = page ? engagements : engagements.slice(0, 2);
  const results = [
    [
      "10+ production loyihada PTES / OWASP WSTG asosida penetration testing.",
      "Bitta SaaS auditida 3 Critical, 4 Medium va 6 Informational topilma.",
      "20+ sayt va dashboard; 90+ reliz oldidan QA tekshiruvi.",
    ],
    [
      "HTB, TryHackMe va VulNyx’da 20+ laboratoriya sinovi.",
      "Enumeration vaqti ~4 soatdan 90 daqiqagacha qisqardi.",
      "Topilmalar risk bahosi va tuzatish tavsiyalari bilan hujjatlashtirildi.",
    ],
    [
      "Tarmoq va web xavfsizligi bo’yicha amaliy dastur.",
      "Active Directory, SIEM va incident response mashg’ulotlari.",
      "Python va Bash yordamida xavfsizlik vazifalarini avtomatlashtirish.",
    ],
  ];
  const ItemHeading = page ? "h2" : "h3";
  return (
    <section className={`v2-band ${page ? "v2-page" : ""}`} id="experience">
      <div className="v2-shell">
        <SectionTitle
          number={page ? undefined : "03"}
          label="TAJRIBA"
          title="Amaliyotda sinalgan."
          page={page}
        >
          <Link
            prefetch={false}
            href={page ? "/work" : "/experience"}
            className="v2-text-link"
          >
            {page ? "Loyihalarni ko’rish" : "Barcha tajriba"}
            <ArrowUpRightIcon />
          </Link>
        </SectionTitle>
        <div className="v2-jobs">
          {jobs.map((job, i) => (
            <article key={job.organisation} className="v2-job">
              <div>
                <p className="v2-mono">{job.period}</p>
                <ItemHeading>{job.organisation}</ItemHeading>
                <p>{job.role}</p>
                <ul className="v2-tags">
                  {job.tags?.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
              <div>
                <ul className="v2-results-list">
                  {results[i]?.map((result) => (
                    <li key={result}>{result}</li>
                  ))}
                </ul>
                {page && (
                  <details className="v2-details">
                    <summary>Batafsil tajriba</summary>
                    <p>{job.summary}</p>
                    {job.areas.map((area) => (
                      <div key={area.title}>
                        <h4>{area.title}</h4>
                        <p>{area.detail}</p>
                      </div>
                    ))}
                  </details>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Skills({ page = false }: SectionProps) {
  const ItemHeading = page ? "h2" : "h3";
  return (
    <section className={`v2-band ${page ? "v2-page" : ""}`} id="skills">
      <div className="v2-shell">
        <SectionTitle
          number={page ? undefined : "04"}
          label="KO’NIKMALAR"
          title="Vositalar emas. Imkoniyatlar."
          page={page}
        >
          <p>
            Muammoni aniqlashdan
            <br />
            qayta sinovgacha.
          </p>
        </SectionTitle>
        <div className="v2-capabilities">
          {capabilities.map((item, i) => (
            <article key={item.title}>
              <span className="v2-mono">0{i + 1}</span>
              <ItemHeading>{item.title}</ItemHeading>
              <p>{item.text}</p>
              <span className="v2-mono">{item.tools}</span>
              <Link prefetch={false} className="v2-text-link" href={item.href}>
                Amaliy tajriba
                <ArrowUpRightIcon />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Certifications({ page = false }: SectionProps) {
  const completed = certificationRoadmap.filter((cert) =>
    cert.name.includes("100%"),
  );
  const pending = certificationRoadmap.filter(
    (cert) => !cert.name.includes("100%"),
  );
  const GroupHeading = page ? "h2" : "h3";
  const CertHeading = page ? "h3" : "h4";
  return (
    <section className={`v2-band ${page ? "v2-page" : ""}`} id="certifications">
      <div className="v2-shell">
        <SectionTitle
          number={page ? undefined : "05"}
          label="SERTIFIKATLAR"
          title="O’rganish davom etadi."
          page={page}
        >
          {!page && (
            <Link
              prefetch={false}
              href="/certifications"
              className="v2-text-link"
            >
              Barcha sertifikatlar
              <ArrowUpRightIcon />
            </Link>
          )}
        </SectionTitle>
        <div className="v2-cert-layout">
          <div>
            <GroupHeading className="v2-cert-group">
              Olingan · hujjati mavjud
            </GroupHeading>
            {certifications.map((cert) => (
              <article className="v2-earned-cert" key={cert.abbr}>
                <div>
                  <span className="v2-status earned">OLINGAN</span>
                  <CertHeading>{cert.abbr}</CertHeading>
                  <p>{cert.name}</p>
                  <p className="v2-mono">
                    {cert.issuer} / {cert.earned}
                  </p>
                  <p className="v2-mono">{cert.credentialId}</p>
                  {cert.image && (
                    <a
                      className="v2-text-link"
                      href={cert.image}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Sertifikatni ochish
                      <ArrowUpRightIcon />
                    </a>
                  )}
                  {cert.verifyUrl && (
                    <a
                      className="v2-text-link"
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Emitent orqali tekshirish
                      <ArrowUpRightIcon />
                    </a>
                  )}
                </div>
                {cert.image && (
                  <a
                    href={cert.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${cert.abbr} sertifikatini ochish`}
                  >
                    <Image
                      src={cert.image}
                      alt={`${cert.issuer}: ${cert.name}, ${cert.earned}`}
                      width={734}
                      height={522}
                      sizes="(max-width: 600px) 280px, 240px"
                      className="v2-certificate-image"
                    />
                  </a>
                )}
              </article>
            ))}
          </div>
          <div className="v2-cert-progress">
            <GroupHeading className="v2-cert-group">
              Kurs tugagan · imtihon kutilmoqda
            </GroupHeading>
            {completed.map((cert) => (
              <div key={cert.abbr} className="v2-cert-row">
                <strong>{cert.abbr}</strong>
                <span>
                  {cert.issuer}
                  <small>Imtihon kutilmoqda</small>
                </span>
              </div>
            ))}
            <GroupHeading className="v2-cert-group in-progress">
              O’qish jarayonida
            </GroupHeading>
            {pending.map((cert) => (
              <div key={cert.abbr} className="v2-cert-row">
                <strong>{cert.abbr}</strong>
                <span>
                  {cert.issuer}
                  <small>Jarayonda</small>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function About({ page = false }: SectionProps) {
  return (
    <section className={`v2-band ${page ? "v2-page" : ""}`} id="about">
      <div className="v2-shell v2-about">
        <div>
          <SectionTitle
            number={page ? undefined : "06"}
            label="MEN HAQIMDA"
            title="Ekran ortida — Sarvar."
            page={page}
          />
          <p className="v2-about-lead">
            Toshkentda yashayman. Xavfsizlikning offensive tomonida ishlayman.
          </p>
          <p>
            ASOS IT’da QA va penetration testing bilan shug’ullanaman. Meni
            faqat zaiflikni topish emas, undan amalda nima qilish mumkinligini
            tushunish va muhandisga aniq tuzatish yo’lini berish qiziqtiradi.
          </p>
          {page ? (
            <>
              <p>{profile.bio[2]}</p>
              <dl className="v2-about-facts">
                <div>
                  <dt>Joylashuv</dt>
                  <dd>Toshkent, O’zbekiston</dd>
                </div>
                <div>
                  <dt>Tillar</dt>
                  <dd>O’zbek · Ingliz (B1+)</dd>
                </div>
                <div>
                  <dt>Yo’nalish</dt>
                  <dd>Offensive Security / QA</dd>
                </div>
              </dl>
            </>
          ) : (
            <Link prefetch={false} className="v2-text-link" href="/about">
              Yaqinroq tanishamiz
              <ArrowUpRightIcon />
            </Link>
          )}
        </div>
        <figure>
          {profile.photo && (
            <Image
              src={profile.photo}
              alt="Sarvar Tolipov"
              width={640}
              height={640}
              sizes="(max-width: 768px) 90vw, 420px"
              className="v2-portrait"
            />
          )}
          <figcaption>
            SARVAR TOLIPOV <span>TOSHKENT / UZ</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function Contact({ page = false }: SectionProps) {
  const Heading = page ? "h1" : "h2";
  return (
    <section className={`v2-contact ${page ? "v2-page" : ""}`} id="contact">
      <div className="v2-shell">
        <p className="v2-kicker">KEYINGI QADAM / BOG’LANISH</p>
        <Heading>
          Xavfsizlikni
          <br />
          <span>birga tekshiramiz.</span>
        </Heading>
        <div className="v2-contact-bottom">
          <p>
            Pentest, hamkorlik yoki ish taklifi.
            <br />
            Vazifa, qamrov va muddatdan boshlaymiz.
          </p>
          <div className="v2-actions">
            <a
              href={profile.links.telegram.href}
              className="v2-button primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TelegramIcon />
              Telegramda yozish
              <ArrowUpRightIcon />
            </a>
            <a href={profile.links.email.href} className="v2-button">
              <MailIcon />
              Email yuborish
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="v2-footer">
      <div className="v2-shell">
        <div className="v2-footer-top">
          <Link prefetch={false} href="/" className="v2-brand">
            SARVAR.T<span>OFFENSIVE SECURITY</span>
          </Link>
          <div className="v2-footer-links">
            {[
              [profile.links.github, GitHubIcon],
              [profile.links.linkedin, LinkedInIcon],
              [profile.links.telegram, TelegramIcon],
              [profile.links.cv, DocumentIcon],
            ].map(([link, Icon]) => {
              const target = link as typeof profile.links.github;
              const Symbol = Icon as typeof GitHubIcon;
              return (
                <a
                  key={target.label}
                  href={target.href}
                  target={target.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                >
                  <Symbol />
                  {target.label}
                </a>
              );
            })}
            <Link prefetch={false} href="/certifications">
              Sertifikatlar
              <ArrowUpRightIcon />
            </Link>
          </div>
        </div>
        <div className="v2-footer-bottom">
          <span>© {new Date().getFullYear()} Sarvar Tolipov</span>
          <span>Toshkent, O’zbekiston</span>
          <a href="#main">Yuqoriga ↑</a>
        </div>
      </div>
    </footer>
  );
}

export function CaseStudy({ study }: { study: CaseStudyRecord }) {
  const index = selectedStudies.findIndex((item) => item.slug === study.slug);
  const related = selectedStudies[(index + 1) % selectedStudies.length];
  return (
    <article className="v2-case v2-page">
      <div className="v2-shell">
        <Link prefetch={false} href="/work" className="v2-text-link">
          <ArrowIcon className="rotate-180" />
          Barcha loyihalar
        </Link>
        <header className="v2-case-header">
          <p className="v2-kicker">
            {study.category} /{" "}
            {study.review ? "MATERIALLAR TAYYORLANMOQDA" : "CASE STUDY"}
          </p>
          <h1>{study.title}</h1>
          <p>{study.summary}</p>
        </header>
        {study.review ? (
          <section className="v2-case-section">
            <h2>Tadqiqot yo’nalishi</h2>
            <div>
              <p>
                Bu sahifa ish yo’nalishi haqida umumiy ma’lumot beradi. Alohida
                nishon bo’yicha walkthrough, dalil va retest natijalari hali
                chop etilmagan.
              </p>
              <ul className="v2-tags">
                {study.technologies.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <Link
                prefetch={false}
                className="v2-text-link"
                href="/experience"
              >
                Hujjatlashtirilgan tajriba
                <ArrowUpRightIcon />
              </Link>
            </div>
          </section>
        ) : (
          <>
            <section className="v2-case-section" id="overview">
              <h2>
                <span>01</span>Vazifa va qamrov
              </h2>
              <div>
                <p>{study.challenge}</p>
                <dl className="v2-case-meta">
                  <div>
                    <dt>Rol</dt>
                    <dd>{study.role}</dd>
                  </div>
                  <div>
                    <dt>Davr</dt>
                    <dd>{study.period}</dd>
                  </div>
                  <div>
                    <dt>Natija</dt>
                    <dd className="v2-result">{study.result}</dd>
                  </div>
                </dl>
                <ul className="v2-tags">
                  {study.technologies.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </section>
            <section className="v2-case-section" id="workflow">
              <h2>
                <span>02</span>
                {study.category === "Tooling"
                  ? "Texnik jarayon"
                  : "Hujum zanjiri"}
              </h2>
              <div>
                <ol className="v2-attack-path">
                  {study.flow.map((step, i) => (
                    <li key={step}>
                      <span className="v2-mono">0{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
                <p>{study.finding}</p>
              </div>
            </section>
            <section className="v2-case-section" id="evidence">
              <h2>
                <span>03</span>Dalil va manba
              </h2>
              <div>
                <Evidence study={study} />
                {study.category === "Tooling" && <SampleOutput />}
                {study.category !== "Tooling" && (
                  <p className="v2-source-note">
                    Bu vizual asl hisobot skrinshoti emas; mavjud tajriba
                    qaydlarining maxfiy tafsilotlarsiz xulosasi. Xom so’rovlar
                    va mijoz hisobotlari ommaga berilmagan.
                  </p>
                )}
                {study.github && (
                  <a
                    href={study.github}
                    className="v2-button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHubIcon />
                    GitHub’da kodni ko’rish
                    <ArrowUpRightIcon />
                  </a>
                )}
              </div>
            </section>
            <section className="v2-case-section" id="impact">
              <h2>
                <span>04</span>
                {study.category === "Tooling"
                  ? "Arxitektura va foyda"
                  : "Ta’sir va tuzatish"}
              </h2>
              <div>
                <p>{study.impact}</p>
                <ul className="v2-results-list">
                  {study.remediation.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>
            <section className="v2-case-section" id="outcome">
              <h2>
                <span>05</span>Yakuniy holat
              </h2>
              <div>
                <p>{study.outcome}</p>
                {study.category === "Tooling" && (
                  <div className="v2-time-comparison">
                    <div>
                      <span>OLDIN</span>
                      <strong>~4 soat</strong>
                    </div>
                    <ArrowIcon />
                    <div>
                      <span>KEYIN</span>
                      <strong>90 daqiqa</strong>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
        <nav className="v2-related" aria-label="Keyingi loyiha">
          <span className="v2-mono">KEYINGI LOYIHA</span>
          <Link prefetch={false} href={`/work/${related.slug}`}>
            {related.title}
            <ArrowUpRightIcon />
          </Link>
        </nav>
      </div>
    </article>
  );
}
