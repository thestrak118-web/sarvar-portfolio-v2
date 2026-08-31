"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { skillGroups } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/ui/EmptyState";

const W = 640;
const H = 440;
const CX = W / 2;
const CY = H / 2;
const R = 132;

function nodePosition(i: number, total: number) {
  const angle = (-90 + (i * 360) / total) * (Math.PI / 180);
  return { x: CX + Math.cos(angle) * R, y: CY + Math.sin(angle) * R, angle };
}

export function Skills({ index = "04" }: { index?: string }) {
  const [activeId, setActiveId] = useState(skillGroups[0]?.id ?? "");
  const [hovered, setHovered] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const group = skillGroups.find((g) => g.id === activeId) ?? skillGroups[0];

  if (!group) {
    return (
      <section id="skills" className="relative scroll-mt-24 border-t border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <SectionHeading index={index} eyebrow="Ko'nikmalar" title="Texnik ko'nikmalar xaritasi." />
          <EmptyState hint="Ko'nikmalar bo'limi" />
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="relative scroll-mt-24 border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeading
          index={index}
          eyebrow="Ko'nikmalar"
          title="Texnik ko'nikmalar xaritasi."
          description="Besh klaster, bitta jarayon: yuzani top, ta'sirni isbotla, tuzatiladigan qilib yoz."
        />

        <div className="mt-16 flex flex-col gap-8">
          {/* ── cluster selector ─────────────────────────────── */}
          <div>
            <ul className="flex flex-wrap gap-2">
              {skillGroups.map((item) => {
                const active = item.id === activeId;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(item.id)}
                      aria-pressed={active}
                      className={cn(
                        "inline-flex h-10 items-center gap-2.5 rounded-[10px] border px-4 text-[13px] transition-colors duration-300",
                        active
                          ? "border-acid/50 bg-acid/[0.08] text-fg"
                          : "border-line bg-white/[0.02] text-muted hover:border-white/25 hover:text-fg",
                      )}
                    >
                      {item.name}
                      <span className={cn("font-mono text-[11px]", active ? "text-acid" : "text-dim")}>
                        {String(item.skills.length).padStart(2, "0")}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="mt-5 text-[13.5px] leading-relaxed text-dim">{group.caption}</p>
          </div>

          {/* ── constellation ────────────────────────────────── */}
          <div>
            <div className="edge-card relative overflow-hidden rounded-2xl">
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <span className="label">Klaster · {group.code}</span>
                <span className="label text-acid/70">{group.skills.length} ta node</span>
              </div>

              {/* desktop: radial node graph */}
              <div className="mx-auto hidden max-w-[780px] px-4 py-2 md:block">
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className="h-auto w-full"
                  role="img"
                  aria-label={`${group.name} ko'nikmalar xaritasi: ${group.skills.join(", ")}`}
                >
                  <defs>
                    <radialGradient id="hub-glow">
                      <stop offset="0%" stopColor="#c3ff3e" stopOpacity="0.09" />
                      <stop offset="100%" stopColor="#c3ff3e" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  <circle cx={CX} cy={CY} r={R} fill="none" stroke="#1e1f23" strokeDasharray="2 6" />
                  <circle cx={CX} cy={CY} r={R * 0.55} fill="none" stroke="#141417" />
                  <circle cx={CX} cy={CY} r={86} fill="url(#hub-glow)" />

                  <AnimatePresence mode="wait">
                    <motion.g
                      key={group.id}
                      initial={reduce ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={reduce ? undefined : { opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {group.skills.map((skill, i) => {
                        const { x, y } = nodePosition(i, group.skills.length);
                        const right = x >= CX - 4;
                        const isHot = hovered === skill;
                        return (
                          <g
                            key={skill}
                            onMouseEnter={() => setHovered(skill)}
                            onMouseLeave={() => setHovered(null)}
                            className="cursor-default"
                          >
                            <motion.line
                              x1={CX}
                              y1={CY}
                              x2={x}
                              y2={y}
                              stroke={isHot ? "#c3ff3e" : "#26282c"}
                              strokeWidth={isHot ? 1.2 : 1}
                              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{ duration: 0.55, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
                            />
                            <motion.circle
                              cx={x}
                              cy={y}
                              r={isHot ? 5 : 3.6}
                              fill={isHot ? "#c3ff3e" : "#0b0b0d"}
                              stroke={isHot ? "#c3ff3e" : "#3a3d3c"}
                              strokeWidth="1"
                              initial={reduce ? false : { scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.4, delay: 0.1 + 0.05 * i }}
                            />
                            <motion.text
                              x={right ? x + 12 : x - 12}
                              y={y + 4}
                              textAnchor={right ? "start" : "end"}
                              className="font-mono"
                              fontSize="11.5"
                              letterSpacing="0.04em"
                              fill={isHot ? "#ecedea" : "#8d918d"}
                              initial={reduce ? false : { opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.4, delay: 0.14 + 0.05 * i }}
                            >
                              {skill}
                            </motion.text>
                          </g>
                        );
                      })}
                    </motion.g>
                  </AnimatePresence>

                  <circle cx={CX} cy={CY} r={26} fill="#0b0b0d" stroke="#2a2d30" />
                  <circle cx={CX} cy={CY} r={16} fill="none" stroke="#3a3d3c" strokeDasharray="1 4" />
                  <circle cx={CX} cy={CY} r={4} fill="#c3ff3e" />
                </svg>
              </div>

              {/* mobile: chip list */}
              <ul className="grid grid-cols-1 gap-px bg-line/60 md:hidden">
                {group.skills.map((skill, i) => (
                  <li
                    key={skill}
                    className="flex items-center gap-3 bg-void px-5 py-3.5 font-mono text-[12.5px] text-fg"
                  >
                    <span className="label text-dim">{String(i + 1).padStart(2, "0")}</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
