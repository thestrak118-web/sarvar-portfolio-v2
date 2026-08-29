import Link from "next/link";
import { profile } from "@/data/profile";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/Icons";
import { IconAction } from "@/components/ui/ActionLink";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-abyss">
      <div className="mx-auto max-w-[1240px] px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Link href="/" className="text-[22px] font-semibold tracking-tight text-fg">
              {profile.name.toUpperCase()}
            </Link>
            <p className="mt-2 font-mono text-[12px] tracking-[0.08em] text-muted">
              Penetration Tester · Cybersecurity
            </p>
          </div>

          <div className="flex items-center gap-3">
            <IconAction link={profile.links.github} label="GitHub profili">
              <GitHubIcon />
            </IconAction>
            <IconAction link={profile.links.linkedin} label="LinkedIn profili">
              <LinkedInIcon />
            </IconAction>
            <IconAction link={profile.links.email} label="Email">
              <MailIcon />
            </IconAction>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="label">© {year} {profile.name}</span>
          <span className="label">Built with precision.</span>
        </div>
      </div>
    </footer>
  );
}
