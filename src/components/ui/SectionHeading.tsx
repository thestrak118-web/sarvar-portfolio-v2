import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
  aside,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  aside?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
        <Reveal>
          <div
            className={cn(
              "flex items-center gap-3",
              align === "center" && "justify-center",
            )}
          >
            {index ? (
              <>
                <span className="label text-acid/80">{index}</span>
                <span className="h-px w-8 bg-line" aria-hidden />
              </>
            ) : null}
            <span className="label">{eyebrow}</span>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-5 text-[clamp(2rem,4.6vw,3.5rem)] font-semibold leading-[1.02] text-fg">
            {title}
          </h2>
        </Reveal>
        {description ? (
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">{description}</p>
          </Reveal>
        ) : null}
      </div>
      {aside ? <Reveal delay={0.14}>{aside}</Reveal> : null}
    </div>
  );
}
