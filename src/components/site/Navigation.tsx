"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/useActiveSection";
import { navLinks } from "@/data/layout";
import { cn } from "@/lib/utils";
import { CloseIcon, DocumentIcon, GitHubIcon, LinkedInIcon, MenuIcon, TelegramIcon } from "@/components/ui/Icons";
import { IconAction } from "@/components/ui/ActionLink";

/** Menu entries come from layout.json: pages link to routes, the rest to anchors. */
const links = navLinks;

export function Navigation() {
  const pathname = usePathname();
  const standalone = pathname !== "/";
  /** Bosh sahifada havolalar hero katakchalarida — menyuda takrorlanmaydi. */
  const showLinks = standalone;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const active = useActiveSection(links.filter((l) => l.anchor).map((l) => l.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";

    // Fokus overlay ostida qolib ketmasin
    if (open) {
      menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    } else if (document.activeElement === document.body) {
      toggleRef.current?.focus();
    }

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const hrefFor = (link: (typeof links)[number]) =>
    link.anchor && !standalone ? `#${link.id}` : link.href;

  const isActive = (link: (typeof links)[number]) =>
    link.anchor ? !standalone && active === link.id : pathname.startsWith(link.href);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-acid focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-void"
      >
        Asosiy qismga o&rsquo;tish
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled
            ? "border-b border-line/80 bg-void/70 backdrop-blur-xl supports-[backdrop-filter]:bg-void/55"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Asosiy menyu"
          className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 sm:px-8"
        >
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-mono text-[13px] tracking-[0.14em] text-fg"
          >
            <span
              className={cn(
                "size-1.5 rounded-full transition-colors duration-500",
                profile.available ? "bg-acid" : "bg-dim",
              )}
              aria-hidden
            />
            {profile.shortName}
          </Link>

          {showLinks ? (
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <li key={link.id}>
                <Link
                  href={hrefFor(link)}
                  aria-current={isActive(link) ? "true" : undefined}
                  className={cn(
                    "relative inline-flex h-9 items-center rounded-lg px-3.5 text-[13px] transition-colors duration-300",
                    isActive(link) ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {link.label}
                  {isActive(link) ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2.5 -bottom-px h-px bg-acid"
                      transition={
                        reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }
                      }
                    />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
          ) : null}

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 sm:flex">
              <IconAction link={profile.links.github} label="GitHub profili">
                <GitHubIcon />
              </IconAction>
              <IconAction link={profile.links.linkedin} label="LinkedIn profili">
                <LinkedInIcon />
              </IconAction>
              <IconAction link={profile.links.telegram} label="Telegram">
                <TelegramIcon />
              </IconAction>
              <IconAction link={profile.links.cv} label="CV (PDF) yuklab olish">
                <DocumentIcon />
              </IconAction>
            </div>
            {showLinks ? (
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Menyuni yopish" : "Menyuni ochish"}
              className="inline-flex size-9 items-center justify-center rounded-lg border border-line text-fg transition-colors hover:bg-white/5 md:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
            ) : null}
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 overscroll-contain bg-void/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex h-full flex-col justify-between px-6 pb-10 pt-24">
              <ul className="flex flex-col">
                {links.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={reduce ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-line/70"
                  >
                    <Link
                      href={hrefFor(link)}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-5 text-2xl font-medium tracking-tight text-fg"
                    >
                      {link.label}
                      <span className="label">{String(i + 1).padStart(2, "0")}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="flex items-center gap-3">
                <IconAction link={profile.links.github} label="GitHub profili">
                  <GitHubIcon />
                </IconAction>
                <IconAction link={profile.links.linkedin} label="LinkedIn profili">
                  <LinkedInIcon />
                </IconAction>
                <IconAction link={profile.links.telegram} label="Telegram">
                  <TelegramIcon />
                </IconAction>
                <IconAction link={profile.links.cv} label="CV (PDF) yuklab olish">
                  <DocumentIcon />
                </IconAction>
                <span className="label ml-auto">{profile.roleLine}</span>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
