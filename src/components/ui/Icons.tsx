import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function GitHubIcon({ className = "size-4", ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden {...rest}>
      <path d="M12 .5C5.73.5.99 5.24.99 11.5c0 4.86 3.15 8.98 7.52 10.44.55.1.75-.24.75-.53l-.02-1.86c-3.06.67-3.7-1.47-3.7-1.47-.5-1.28-1.23-1.62-1.23-1.62-1-.68.08-.67.08-.67 1.1.08 1.69 1.14 1.69 1.14.98 1.69 2.58 1.2 3.21.92.1-.72.39-1.2.7-1.48-2.44-.28-5.01-1.23-5.01-5.48 0-1.21.43-2.2 1.14-2.98-.11-.28-.5-1.4.11-2.92 0 0 .93-.3 3.05 1.14a10.5 10.5 0 0 1 5.56 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.52.22 2.64.11 2.92.71.78 1.14 1.77 1.14 2.98 0 4.26-2.58 5.19-5.03 5.47.4.34.75 1.02.75 2.06l-.01 3.05c0 .3.2.64.76.53 4.36-1.46 7.5-5.58 7.5-10.44C23.01 5.24 18.27.5 12 .5Z" />
    </svg>
  );
}

export function LinkedInIcon({ className = "size-4", ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden {...rest}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function TelegramIcon({ className = "size-4", ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden {...rest}>
      <path d="M21.94 4.3 18.7 19.6c-.24 1.08-.88 1.35-1.79.84l-4.94-3.64-2.38 2.3c-.27.26-.49.48-1 .48l.35-5.03 9.15-8.27c.4-.35-.09-.55-.62-.2L6.16 13.2 1.29 11.7c-1.06-.33-1.08-1.06.22-1.57L20.57 2.8c.88-.33 1.65.2 1.37 1.5Z" />
    </svg>
  );
}

export function MailIcon({ className = "size-4", ...rest }: IconProps) {
  return (
    <svg {...base} className={className} {...rest}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m3 6.5 8.2 6a1.4 1.4 0 0 0 1.6 0l8.2-6" />
    </svg>
  );
}

export function DocumentIcon({ className = "size-4", ...rest }: IconProps) {
  return (
    <svg {...base} className={className} {...rest}>
      <path d="M14 2.5H7a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7.5Z" />
      <path d="M14 2.5v5h5" />
      <path d="M12 11v6" />
      <path d="m9.5 14.5 2.5 2.5 2.5-2.5" />
    </svg>
  );
}

export function ArrowIcon({ className = "size-4", ...rest }: IconProps) {
  return (
    <svg {...base} className={className} {...rest}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRightIcon({ className = "size-4", ...rest }: IconProps) {
  return (
    <svg {...base} className={className} {...rest}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function ShieldIcon({ className = "size-4", ...rest }: IconProps) {
  return (
    <svg {...base} className={className} {...rest}>
      <path d="M12 3 4.5 6v5.5c0 4.2 3.1 8.1 7.5 9.5 4.4-1.4 7.5-5.3 7.5-9.5V6L12 3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </svg>
  );
}

export function TerminalIcon({ className = "size-4", ...rest }: IconProps) {
  return (
    <svg {...base} className={className} {...rest}>
      <rect x="2.5" y="4" width="19" height="16" rx="2" />
      <path d="m7 9 3 3-3 3" />
      <path d="M12.5 15h4.5" />
    </svg>
  );
}

export function MenuIcon({ className = "size-5", ...rest }: IconProps) {
  return (
    <svg {...base} className={className} {...rest}>
      <path d="M3.5 8h17" />
      <path d="M3.5 16h17" />
    </svg>
  );
}

export function CloseIcon({ className = "size-5", ...rest }: IconProps) {
  return (
    <svg {...base} className={className} {...rest}>
      <path d="M6 6 18 18" />
      <path d="M18 6 6 18" />
    </svg>
  );
}
