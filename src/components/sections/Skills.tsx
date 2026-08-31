"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  capabilityCount,
  methodology,
  skillCategories,
  skillsSubtitle,
  skillsTitle,
} from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";

/** Bitta capability qatori: nom + tegishli tool badge'lari. */
function CapabilityRow({ name, tools }: { name: string; tools: string[] }) {
  return (
    <li className="group/row flex flex-col gap-2 border-t border-line/60 py-3.5 first:border-t-0 first:pt-0 sm:flex-row sm:items-baseline sm:gap-4">
      <div className="flex min-w-0 flex-1 items-baseline gap-2.5">
        <span
          className="mt-[7px] size-1 shrink-0 rounded-full bg-dim transition-colors duration-300 group-hover/row:bg-acid"
          aria-hidden
        />
        <span className="text-[14px] font-medium leading-snug text-fg">{name}</span>
      </div>

      {tools.length > 0 ? (
        <ul className="flex flex-wrap gap-1.5 pl-[14px] sm:max-w-[58%] sm:justify-end sm:pl-0">
          {tools.map((tool) => (
            <li
              key={tool}
              className="rounded border border-line bg-white/[0.02] px-2 py-1 font-mono text-[10.5px] leading-none tracking-[0.06em] text-muted"
            >
              {tool}
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function Skills({ index = "" }: { index?: string }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const reduce = useReducedMotion();

  if (skillCategories.length === 0) {
    return (
      <section id="skills" className="relative scroll-mt-24 border-t border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <SectionHeading index={index} eyebrow="Ko'nikmalar" title={skillsTitle} />
          <EmptyState hint="Ko'nikmalar bo'limi" />
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="relative scroll-mt-24 border-t border-line py-16 sm:py-20">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeading
          index={index}
          eyebrow="Ko'nikmalar"
          title={skillsTitle}
          description={skillsSubtitle}
          aside={
            <div className="rounded-xl border border-line bg-surface px-5 py-4">
              <p className="text-[26px] font-semibold leading-none tracking-[-0.04em] text-fg">
                {capabilityCount}
              </p>
              <p className="label mt-2">Capability · {skillCategories.length} yo&rsquo;nalish</p>
            </div>
          }
        />

        {/* ── capability panellari ─────────────────────────────── */}
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {skillCategories.map((category, i) => {
            const open = openId === category.id;
            return (
              <Reveal key={category.id} delay={0.04 * (i % 2)}>
                <article
                  onMouseEnter={() => setOpenId(category.id)}
                  onMouseLeave={() => setOpenId(null)}
                  className={cn(
                    "edge-card h-full rounded-2xl p-6 transition-colors duration-300 sm:p-7",
                    open && "bg-elevated",
                  )}
                >
                  <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b border-line pb-4">
                    <div className="flex items-baseline gap-3">
                      <span
                        className={cn(
                          "size-1.5 rounded-full transition-colors duration-300",
                          open ? "bg-acid" : "bg-line",
                        )}
                        aria-hidden
                      />
                      <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-fg">
                        {category.name}
                      </h3>
                    </div>
                    <span className="label text-acid/70">{category.code}</span>
                  </header>

                  <p className="mt-4 text-[13px] leading-relaxed text-dim">{category.caption}</p>

                  <ul className="mt-5">
                    {category.capabilities.map((capability) => (
                      <CapabilityRow
                        key={capability.name}
                        name={capability.name}
                        tools={capability.tools}
                      />
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* ── methodology ──────────────────────────────────────── */}
        <div className="mt-16 border-t border-line pt-12">
          <Reveal>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="font-mono text-[13px] uppercase tracking-[0.18em] text-acid/80">
                {methodology.title}
              </h3>
              <p className="max-w-xl text-[13px] leading-relaxed text-dim">{methodology.caption}</p>
            </div>
          </Reveal>

          <ol className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line/60 sm:grid-cols-2 lg:grid-cols-4">
            {methodology.steps.map((step, i) => (
              <li key={step.name} className="relative bg-void">
                <motion.div
                  initial={reduce ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.4, delay: reduce ? 0 : 0.04 * i }}
                  className="group flex h-full items-start gap-3.5 px-5 py-5 transition-colors duration-300 hover:bg-surface"
                >
                  <span className="font-mono text-[11px] leading-[1.6] tracking-[0.1em] text-acid/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[12.5px] uppercase leading-snug tracking-[0.1em] text-fg">
                      {step.name}
                    </span>
                    <span className="mt-1.5 block text-[12px] leading-snug text-dim">
                      {step.detail}
                    </span>
                  </span>
                </motion.div>

                {/* oqim ko'rsatkichi: mobilda pastga, kengroq ekranda o'ngga */}
                {i < methodology.steps.length - 1 ? (
                  <span
                    className="pointer-events-none absolute bottom-[-7px] left-5 z-10 font-mono text-[11px] leading-none text-line sm:bottom-auto sm:left-auto sm:right-[-6px] sm:top-1/2 sm:-translate-y-1/2"
                    aria-hidden
                  >
                    <span className="sm:hidden">↓</span>
                    <span className="hidden sm:inline">→</span>
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
