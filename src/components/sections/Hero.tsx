"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { heroMetrics, profile } from "@/data/profile";
import { workHref } from "@/data/layout";
import { HeroVisual } from "@/components/three/HeroVisual";
import { ActionLink } from "@/components/ui/ActionLink";
import { Magnetic } from "@/components/ui/MagneticButton";
import { ArrowIcon, ArrowUpRightIcon, GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";

export function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section
      id="top"
      className="relative isolate flex flex-col justify-center overflow-hidden pt-28 pb-10 lg:pb-12"
    >
      {/* ── backdrop ─────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="grid-lines absolute inset-0 mask-fade-b opacity-70" />
        <div className="absolute left-1/2 top-[-18%] h-[540px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(90,209,255,0.07),transparent_65%)]" />
        <div className="absolute bottom-[-10%] left-[-8%] h-[420px] w-[560px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(195,255,62,0.05),transparent_70%)]" />
      </div>

      <HeroVisual className="pointer-events-none absolute left-1/2 top-[44%] -z-10 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 opacity-30 mask-radial md:hidden" />

      <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        {/* 3D yadro konteynerga bog'langan: keng ekranda ham matndan uzoqlashmaydi */}
        <HeroVisual className="pointer-events-none absolute right-[-6%] top-1/2 -z-10 hidden h-[680px] w-[680px] -translate-y-1/2 mask-radial md:block lg:right-[-2%] xl:right-0" />

        <div className="max-w-[760px]">
          <motion.div {...rise(0.05)} className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-acid/25 bg-acid/[0.06] py-1.5 pl-2.5 pr-3.5">
              <span className="relative flex size-1.5">
                <span className="pulse-ring absolute inline-flex size-full rounded-full bg-acid" />
                <span className="relative inline-flex size-1.5 rounded-full bg-acid" />
              </span>
              <span className="font-mono text-[10.5px] uppercase leading-none tracking-[0.18em] text-acid">
                {profile.availability}
              </span>
            </span>
            <span className="label hidden sm:inline">
              {profile.name} — {profile.roleLine} · {profile.location}
            </span>
          </motion.div>

          <h1 className="mt-8 text-[clamp(2.6rem,7.4vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
            <motion.span {...rise(0.12)} className="block text-fg">
              {profile.headline[0]}
            </motion.span>
            <motion.span {...rise(0.2)} className="block text-muted/75">
              {profile.headline[1]}
            </motion.span>
          </h1>

          <motion.p
            {...rise(0.3)}
            className="mt-7 max-w-[540px] text-[15.5px] leading-relaxed text-muted"
          >
            {profile.intro}
          </motion.p>

          <motion.div {...rise(0.38)} className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Link
                href={workHref}
                className="group inline-flex h-11 items-center gap-2.5 rounded-[10px] border border-acid bg-acid px-5 text-[13px] font-medium text-void shadow-[0_18px_45px_-22px_rgba(195,255,62,0.8)] transition-colors duration-300 hover:bg-[#d3ff67]"
              >
                Ishlarni ko&rsquo;rish
                <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </Magnetic>
            <Magnetic>
              <ActionLink
                link={profile.links.github}
                icon={<GitHubIcon className="size-4" />}
              />
            </Magnetic>
            <Magnetic>
              <ActionLink
                link={profile.links.linkedin}
                icon={<LinkedInIcon className="size-4" />}
              />
            </Magnetic>
          </motion.div>
        </div>

        {/* ── metrics rail ─────────────────────────────────────── */}
        <motion.ul
          {...rise(0.5)}
          aria-label="Key metrics"
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line/60 sm:mt-20 lg:grid-cols-4"
        >
          {heroMetrics.map((metric, i) => {
            const body = (
              <>
                {metric.hint ? <span className="label mb-2.5 block">{metric.hint}</span> : null}
                <span className="flex items-baseline gap-2">
                  <span className="text-[clamp(1.2rem,1.75vw,1.6rem)] font-semibold leading-snug tracking-[-0.025em] text-fg">
                    {metric.value}
                  </span>
                  {metric.label ? (
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
                      {metric.label}
                    </span>
                  ) : null}
                </span>
                <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-acid/70 transition-transform duration-500 group-hover:scale-x-100" />
              </>
            );

            const box =
              "group relative flex min-h-[104px] flex-col justify-center bg-void/90 px-5 py-6 transition-colors duration-300 hover:bg-surface";

            return (
              <li key={`${metric.value}-${i}`} className="contents">
                {metric.href ? (
                  <Link href={metric.href} className={box}>
                    {body}
                    <ArrowUpRightIcon className="absolute right-4 top-4 size-4 text-dim opacity-0 transition-[opacity,color] duration-300 group-hover:text-acid group-hover:opacity-100" />
                  </Link>
                ) : (
                  <div className={box}>{body}</div>
                )}
              </li>
            );
          })}
        </motion.ul>
      </div>

    </section>
  );
}
