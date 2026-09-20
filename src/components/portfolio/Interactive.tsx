"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  CloseIcon,
  MenuIcon,
  DocumentIcon,
  ArrowUpRightIcon,
} from "@/components/ui/Icons";
import { profile } from "@/data/profile";
import { layoutSections, routes } from "@/data/layout";

const navigation = layoutSections
  .filter((item) => item.nav && item.place !== "off" && item.id !== "contact")
  .map((item) => [routes[item.id], item.nav]);

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth >= 1050) setOpen(false);
    };
    document.addEventListener("keydown", close);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("keydown", close);
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  return (
    <>
      <a className="v2-skip" href="#main">
        Asosiy qismga o’tish
      </a>
      <header className="v2-header">
        <nav className="v2-shell v2-nav" aria-label="Asosiy menyu">
          <Link prefetch={false} href="/" className="v2-brand" onClick={() => setOpen(false)}>
            SARVAR.T<span>OFFENSIVE SECURITY</span>
          </Link>
          <div className="v2-desktop-nav">
            {navigation.map(([href, text]) => (
              <Link
                prefetch={false}
                key={href}
                href={href}
                aria-current={path.startsWith(href) ? "page" : undefined}
              >
                {text}
              </Link>
            ))}
          </div>
          <div className="v2-nav-actions">
            <Link
              prefetch={false}
              className="v2-contact-link"
              href="/contact"
              onClick={() => setOpen(false)}
            >
              Bog’lanish <ArrowUpRightIcon />
            </Link>
            <a
              className="v2-cv"
              href={profile.links.cv.href}
              title="CV yuklab olish (PDF)"
              aria-label="CV yuklab olish (PDF)"
            >
              <DocumentIcon />
              <span>CV</span>
            </a>
            <button
              type="button"
              className="v2-menu-toggle"
              ref={trigger}
              aria-label={open ? "Menyuni yopish" : "Menyuni ochish"}
              title={open ? "Menyuni yopish" : "Menyuni ochish"}
              aria-expanded={open}
              aria-controls="v2-mobile-menu"
              onClick={() => setOpen(!open)}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>
        {open && (
          <div
            id="v2-mobile-menu"
            className="v2-mobile-nav v2-shell"
            ref={menu}
            onBlur={(event) => {
              if (
                !event.currentTarget.parentElement?.contains(
                  event.relatedTarget,
                )
              )
                setOpen(false);
            }}
          >
            {navigation.map(([href, text]) => (
              <Link
                prefetch={false}
                key={href}
                href={href}
                aria-current={path.startsWith(href) ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {text}
                <ArrowUpRightIcon />
              </Link>
            ))}
            <Link prefetch={false} href="/certifications" onClick={() => setOpen(false)}>
              Sertifikatlar
              <ArrowUpRightIcon />
            </Link>
          </div>
        )}
      </header>
    </>
  );
}

const proofTabs = [
  {
    label: "Production",
    code: "AUDIT / 01",
    title: "Bitta audit. Uchta kritik topilma.",
    metric: "9.1–9.8",
    unit: "CVSS",
    path: ["Kod oshkorligi", "JWT kaliti", "Admin huquqi"],
    text: "SaaS va AWS EC2 · ASOS IT",
    href: "/work/saas-security-assessment",
    note: "Maxfiy tafsilotlari chiqarilgan audit xulosasi",
    color: "critical",
  },
  {
    label: "Automation",
    code: "TOOLING / 02",
    title: "Takroriy ishga kamroq vaqt.",
    metric: "90",
    unit: "DAQIQA",
    path: ["Ruxsatli domen", "Enumeration", "Hisobot"],
    text: "Python / Bash · shaxsiy ish jarayoni",
    href: "/work/security-automation-scripts",
    note: "Oldin ~4 soat · tajriba qaydlaridagi natija",
    color: "lime",
  },
  {
    label: "Laboratoriya",
    code: "RESEARCH / 03",
    title: "Amaliyot. Tahlil. Hisobot.",
    metric: "20+",
    unit: "SINOV",
    path: ["HTB / THM / VulNyx", "Ta’sirni tekshirish", "Tuzatish rejasi"],
    text: "Mustaqil xavfsizlik tadqiqoti",
    href: "/experience",
    note: "Individual walkthrough materiallari tayyorlanmoqda",
    color: "cyan",
  },
];

export function ProofConsole() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const panel = proofTabs[active];
  return (
    <div className="v2-console">
      <div className="v2-console-top">
        <span className="v2-mono">AMALIY NATIJALAR</span>
        <div role="tablist" aria-label="Natija yo’nalishi" className="v2-tabs">
          {proofTabs.map((tab, i) => (
            <button
              key={tab.label}
              ref={(el) => {
                refs.current[i] = el;
              }}
              id={`proof-tab-${i}`}
              role="tab"
              aria-selected={active === i}
              aria-controls="proof-panel"
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(event) => {
                const target =
                  event.key === "ArrowRight"
                    ? (i + 1) % 3
                    : event.key === "ArrowLeft"
                      ? (i + 2) % 3
                      : event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? 2
                          : null;
                if (target !== null) {
                  event.preventDefault();
                  setActive(target);
                  refs.current[target]?.focus();
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div
        role="tabpanel"
        id="proof-panel"
        aria-labelledby={`proof-tab-${active}`}
        className={`v2-proof-panel ${panel.color}`}
        tabIndex={0}
      >
        <div className="v2-proof-number">
          <strong>{panel.metric}</strong>
          <span className="v2-mono">{panel.unit}</span>
        </div>
        <div className="v2-proof-body">
          <span className="v2-mono">
            {panel.code} / {panel.text}
          </span>
          <h2>{panel.title}</h2>
          <ol className="v2-proof-path">
            {panel.path.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
        <Link
          href={panel.href}
          className="v2-proof-link"
          aria-label={`${panel.label}: batafsil ko’rish`}
        >
          <ArrowUpRightIcon />
          <span>Batafsil</span>
        </Link>
        <p className="v2-proof-note">{panel.note}</p>
      </div>
    </div>
  );
}

const steps = [
  [
    "01",
    "Qamrov",
    "Yozma ruxsat, tekshiriladigan aktivlar va sinov chegaralari kelishiladi.",
  ],
  [
    "02",
    "Aniqlash",
    "Host, servis, endpoint va kirish nuqtalaridan hujum yuzasi xaritasi tuziladi.",
  ],
  [
    "03",
    "Tasdiqlash",
    "Zaiflik qo’lda tekshiriladi. Ta’sir kelishilgan qamrovda, boshqariladigan PoC bilan isbotlanadi.",
  ],
  [
    "04",
    "Hisobot",
    "CVSS, dalillar va ustuvor tuzatishlar muhandislar uchun aniq hisobotga aylanadi.",
  ],
  [
    "05",
    "Qayta sinov",
    "Tuzatishlar qayta tekshiriladi; qolgan xavflar va sinov cheklovlari qayd etiladi.",
  ],
];
export function Workflow() {
  const [active, setActive] = useState(0);
  return (
    <section className="v2-band v2-workflow" aria-labelledby="workflow-title">
      <div className="v2-shell">
        <div className="v2-section-head">
          <div>
            <p className="v2-kicker">02 / ISH JARAYONI</p>
            <h2 id="workflow-title">Topilmadan tuzatishgacha.</h2>
          </div>
          <p>
            PTES · OWASP WSTG
            <br />
            Har qadamning aniq natijasi bor.
          </p>
        </div>
        <div className="v2-workflow-layout">
          <ol className="v2-workflow-steps">
            {steps.map(([no, title], i) => (
              <li key={no}>
                <button
                  type="button"
                  aria-pressed={active === i}
                  aria-controls="workflow-detail"
                  onClick={() => setActive(i)}
                >
                  <span>{no}</span>
                  {title}
                  <ArrowUpRightIcon />
                </button>
              </li>
            ))}
          </ol>
          <div className="v2-workflow-detail" id="workflow-detail">
            <span className="v2-step-number" aria-hidden>
              {steps[active][0]}
            </span>
            <div aria-live="polite">
              <h3>{steps[active][1]}</h3>
              <p>{steps[active][2]}</p>
            </div>
            <div className="v2-progress" aria-hidden>
              <span style={{ width: `${(active + 1) * 20}%` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactGate({ children }: { children: React.ReactNode }) {
  return usePathname() === "/contact" ? null : children;
}

export function HeroGrid() {
  const grid = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (
      !matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)")
        .matches
    )
      return;
    const element = grid.current;
    const hero = element?.parentElement;
    if (!element || !hero) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        element.style.setProperty("--grid-x", `${event.clientX - rect.left}px`);
        element.style.setProperty("--grid-y", `${event.clientY - rect.top}px`);
      });
    };
    hero.addEventListener("pointermove", move, { passive: true });
    return () => {
      hero.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);
  return <div ref={grid} className="v2-hero-grid" aria-hidden="true" />;
}

export function MagneticLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      prefetch={false}
      href={href}
      className={className}
      onPointerMove={(event) => {
        if (
          event.pointerType !== "mouse" ||
          matchMedia("(prefers-reduced-motion: reduce)").matches
        )
          return;
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * 0.035}px, ${(event.clientY - rect.top - rect.height / 2) * 0.06}px)`;
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.transform = "";
      }}
      onBlur={(event) => {
        event.currentTarget.style.transform = "";
      }}
    >
      {children}
    </Link>
  );
}
