import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ExternalLink } from "@/data/profile";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-acid text-void hover:bg-[#d3ff67] border border-acid shadow-[0_0_0_1px_rgba(195,255,62,0.25),0_18px_45px_-22px_rgba(195,255,62,0.65)]",
  secondary:
    "border border-line bg-white/[0.02] text-fg hover:border-white/25 hover:bg-white/[0.05]",
  ghost: "border border-transparent text-muted hover:text-fg",
};

const sizeClass =
  "inline-flex h-11 items-center gap-2.5 rounded-[10px] px-5 text-[13px] font-medium tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow] duration-300";

/**
 * Renders an external link only when a real URL is configured.
 * When it is not, it degrades to a clearly-marked placeholder instead of a
 * dead link — the site never ships an invented URL.
 */
export function ActionLink({
  link,
  variant = "secondary",
  icon,
  children,
  className,
}: {
  link: ExternalLink;
  variant?: Variant;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  const label = children ?? link.label;

  if (!link.href) {
    return (
      <span
        role="note"
        title="Kiritilmagan — admin panel → Havolalar bo'limida to'ldiriladi"
        className={cn(
          sizeClass,
          "cursor-default border border-dashed border-line text-dim",
          className,
        )}
      >
        {icon}
        <span>{label}</span>
        <span className="label text-dim">kiritilmagan</span>
      </span>
    );
  }

  const external = link.href.startsWith("http") || link.href.startsWith("mailto:");

  return (
    <Link
      href={link.href}
      target={link.href.startsWith("http") ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(sizeClass, styles[variant], className)}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export function IconAction({
  link,
  children,
  label,
}: {
  link: ExternalLink;
  children: ReactNode;
  label: string;
}) {
  const shell =
    "inline-flex size-9 items-center justify-center rounded-lg border border-line text-muted transition-colors duration-300";

  if (!link.href) {
    return (
      <span
        role="note"
        aria-label={`${label} — havola kiritilmagan`}
        title="Kiritilmagan — admin panel → Havolalar bo'limida to'ldiriladi"
        className={cn(shell, "cursor-default border-dashed text-dim")}
      >
        {children}
      </span>
    );
  }

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(shell, "hover:border-white/25 hover:bg-white/[0.04] hover:text-fg")}
    >
      {children}
    </a>
  );
}
