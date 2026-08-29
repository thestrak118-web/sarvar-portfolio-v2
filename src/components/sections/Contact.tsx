import { profile } from "@/data/profile";
import { Reveal } from "@/components/ui/Reveal";
import { ActionLink } from "@/components/ui/ActionLink";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/Icons";

export function Contact({ index = "" }: { index?: string }) {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden border-t border-line py-16 sm:py-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute bottom-[-40%] left-1/2 h-[560px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(195,255,62,0.07),transparent_65%)]" />
      </div>

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <Reveal>
          <div className="flex items-center gap-3">
            {index ? (
              <>
                <span className="label text-acid/80">{index}</span>
                <span className="h-px w-8 bg-line" aria-hidden />
              </>
            ) : null}
            <span className="label">Bog&rsquo;lanish</span>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="mt-6 max-w-3xl text-[clamp(2.2rem,5.6vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-fg">
            Sinovga arziydigan attack surface bormi?
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-6 text-[18px] text-muted">Keling, xavfsizlik haqida gaplashamiz.</p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-9 flex flex-wrap gap-3">
            <ActionLink
              link={profile.links.email}
              variant="primary"
              icon={<MailIcon className="size-4" />}
            >
              Email
            </ActionLink>
            <ActionLink link={profile.links.github} icon={<GitHubIcon className="size-4" />} />
            <ActionLink link={profile.links.linkedin} icon={<LinkedInIcon className="size-4" />} />
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <p className="mt-8 max-w-lg text-[13px] leading-relaxed text-dim">
            Aloqa formasi yo&rsquo;q: saytga backend yoki pochta xizmati ulanmagan, forma xabarni
            indamay yo&rsquo;qotardi. Email va LinkedIn — ishlaydigan kanallar.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
