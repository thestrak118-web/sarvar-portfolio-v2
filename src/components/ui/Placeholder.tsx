import { cn } from "@/lib/utils";

/** Honest, deliberately styled stand-in for content that has not been supplied. */
export function Placeholder({
  label = "Matn kutilmoqda",
  hint,
  className,
  lines = 3,
}: {
  label?: string;
  hint?: string;
  className?: string;
  lines?: number;
}) {
  return (
    <div className={cn("placeholder-block rounded-xl p-5", className)}>
      <div className="flex items-center gap-2.5">
        <span className="size-1.5 rounded-full bg-dim" aria-hidden />
        <span className="label text-dim">{label}</span>
      </div>
      {hint ? <p className="mt-3 max-w-lg text-[13px] leading-relaxed text-dim">{hint}</p> : null}
      <div className="mt-4 space-y-2" aria-hidden>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-px bg-line"
            style={{ width: `${[92, 78, 64, 84, 70][i % 5]}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-line bg-white/[0.02] px-2 py-1 font-mono text-[10px] leading-none tracking-[0.14em] text-muted uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
