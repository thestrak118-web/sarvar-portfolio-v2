import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ActionLink } from "@/components/ui/ActionLink";
import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { repos, githubUser } from "@/data/github";

export function SocialProof({ index = "07" }: { index?: string }) {
  const github = profile.links.github;
  const linkedin = profile.links.linkedin;

  return (
    <section id="social" className="relative scroll-mt-24 border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeading
          index={index}
          eyebrow="Presence"
          title="Code and profile."
          description="Public work lives on GitHub; professional history and engagement enquiries go through LinkedIn."
        />

        <div className="mt-14 flex flex-col gap-5">
          {/* GitHub */}
          <Reveal>
            <div className="edge-card flex h-full flex-col rounded-2xl p-7 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl border border-line bg-void">
                    <GitHubIcon className="size-4.5 text-fg" />
                  </span>
                  <div>
                    <p className="text-[16px] font-medium text-fg">GitHub</p>
                    <p className="label mt-1">
                      {github.href ? `@${githubUser}` : "Profile URL not configured"}
                    </p>
                  </div>
                </div>
                <span className="label text-dim">{repos.length} repositories shown</span>
              </div>

              <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line/60">
                {repos.map((repo) => (
                  <li key={repo.name} className={repo.featured ? "bg-void sm:col-span-2" : "bg-void"}>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full flex-col px-5 py-4 transition-colors duration-300 hover:bg-surface"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-2 font-mono text-[13px] text-fg">
                          {repo.name}
                          <ArrowUpRightIcon className="size-3.5 text-dim transition-colors duration-300 group-hover:text-acid" />
                        </span>
                        <span className="label text-dim">{repo.tag}</span>
                      </div>
                      <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
                        {repo.description}
                      </p>
                      <span className="label mt-3 text-dim">{repo.language}</span>
                    </a>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-[12.5px] leading-relaxed text-dim">
                Star counts and contribution graphs are deliberately not printed as static numbers —
                they go stale. The repositories above link straight to the source.
              </p>

              <div className="mt-7">
                <ActionLink
                  link={github}
                  variant="secondary"
                  icon={<GitHubIcon className="size-4" />}
                >
                  Open GitHub profile
                </ActionLink>
              </div>
            </div>
          </Reveal>

          {/* LinkedIn */}
          <Reveal delay={0.08}>
            <div className="edge-card flex h-full flex-col justify-between rounded-2xl p-7 sm:p-8">
              <div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl border border-line bg-void">
                    <LinkedInIcon className="size-4 text-fg" />
                  </span>
                  <div>
                    <p className="text-[16px] font-medium text-fg">LinkedIn</p>
                    <p className="label mt-1">
                      {linkedin.href ? "Professional profile" : "Profile URL not configured"}
                    </p>
                  </div>
                </div>

                <p className="mt-8 text-[15px] leading-relaxed text-muted">
                  Full professional history, certification record and recommendations. The fastest
                  route for recruiters and consultancies to start a conversation.
                </p>

                <dl className="mt-8 space-y-3">
                  {[
                    ["Role", profile.role],
                    ["Location", profile.location],
                    ["Focus", "Offensive Security"],
                    ["Status", profile.available ? "Open to opportunities" : "Not available"],
                  ].map(([key, value]) => (
                    <div key={key} className="flex items-baseline justify-between gap-4">
                      <dt className="label">{key}</dt>
                      <dd className="font-mono text-[12.5px] text-fg">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-8">
                <ActionLink
                  link={linkedin}
                  variant="secondary"
                  icon={<LinkedInIcon className="size-4" />}
                >
                  Connect on LinkedIn
                </ActionLink>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
