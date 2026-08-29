"use client";

import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

export function ChapterNav({ chapters }: { chapters: { no: string; title: string }[] }) {
  const ids = chapters.map((c) => `phase-${c.no}`);
  const active = useActiveSection(ids, 0.3);

  return (
    <nav aria-label="Hisobot bosqichlari" className="lg:sticky lg:top-24">
      <p className="label border-b border-line pb-3">Hisobot bosqichlari</p>
      <ol className="mt-4 space-y-0.5">
        {chapters.map((chapter) => {
          const id = `phase-${chapter.no}`;
          const isActive = active === id;
          return (
            <li key={chapter.no}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] transition-colors duration-300",
                  isActive ? "bg-surface text-fg" : "text-muted hover:bg-surface/60 hover:text-fg",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[10.5px] tracking-[0.12em] transition-colors duration-300",
                    isActive ? "text-acid" : "text-dim",
                  )}
                >
                  {chapter.no}
                </span>
                {chapter.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
