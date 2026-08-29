"use client";

import Link from "next/link";
import Image from "next/image";
import { TiltCard } from "@/components/ui/TiltCard";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { Tag } from "@/components/ui/Placeholder";
import { cn } from "@/lib/utils";
import { statusTone, type Project } from "@/data/projects";

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <TiltCard className="h-full">
      <Link
        href={`/work/${project.slug}`}
        className="edge-card group flex h-full flex-col rounded-2xl p-6 transition-colors duration-500 hover:bg-elevated sm:p-7"
      >
        {project.cover ? (
          <div className="relative -mx-6 -mt-6 mb-6 aspect-[16/9] overflow-hidden rounded-t-2xl border-b border-line sm:-mx-7 sm:-mt-7">
            <Image
              src={project.cover}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
          </div>
        ) : null}

        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-[26px] leading-none tracking-[-0.03em] text-faint transition-colors duration-500 group-hover:text-acid/70">
            {project.index}
          </span>
          <span
            className={cn(
              "rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase leading-none tracking-[0.12em]",
              statusTone[project.status] ?? "text-dim border-line bg-white/[0.02]",
            )}
          >
            {project.status}
          </span>
        </div>

        <h3
          className={cn(
            "mt-6 font-semibold leading-[1.15] tracking-[-0.03em] text-fg",
            featured ? "text-[26px] sm:text-[30px]" : "text-[20px]",
          )}
        >
          {project.title}
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className="font-mono text-[11.5px] tracking-[0.06em] text-acid/70">
            {project.category}
          </span>
          <span className="size-1 rounded-full bg-line" aria-hidden />
          <span className="font-mono text-[11.5px] text-dim">{project.targetType}</span>
        </div>

        <p
          className={cn(
            "mt-5 leading-relaxed text-muted",
            featured ? "text-[14.5px]" : "text-[13.5px]",
          )}
        >
          {project.summary}
        </p>

        <div className="mt-auto pt-7">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
            <span className="label">{project.tools.length} vosita · 8 bosqich</span>
            <span className="inline-flex items-center gap-1.5 text-[12.5px] text-fg">
              Case study
              <ArrowUpRightIcon className="size-3.5 text-acid transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
