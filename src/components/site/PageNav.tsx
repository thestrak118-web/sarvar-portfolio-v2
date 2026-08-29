import Link from "next/link";
import { pageSections, placeOf, routes, type SectionId } from "@/data/layout";
import { ArrowUpRightIcon } from "@/components/ui/Icons";

/** Bottom navigation shown on every standalone section page. */
export function PageNav({ current }: { current: SectionId }) {
  const others = pageSections.filter((item) => item.id !== current);
  const contactHref = placeOf("contact") === "page" ? routes.contact : "/#contact";

  return (
    <section className="border-t border-line bg-abyss py-16">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="label">Davomi</span>
            <ul className="mt-5 flex flex-wrap gap-2">
              {others.map((item) => (
                <li key={item.id}>
                  <Link
                    href={routes[item.id]}
                    className="inline-flex h-10 items-center rounded-[10px] border border-line bg-white/[0.02] px-4 text-[13px] text-muted transition-colors duration-300 hover:border-white/25 hover:text-fg"
                  >
                    {item.nav || item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/work"
                  className="inline-flex h-10 items-center rounded-[10px] border border-line bg-white/[0.02] px-4 text-[13px] text-muted transition-colors duration-300 hover:border-white/25 hover:text-fg"
                >
                  Security Work
                </Link>
              </li>
            </ul>
          </div>

          <Link
            href={contactHref}
            className="group inline-flex h-11 items-center gap-2.5 self-start rounded-[10px] border border-acid bg-acid px-5 text-[13px] font-medium text-void transition-colors duration-300 hover:bg-[#d3ff67] md:self-auto"
          >
            Bog&rsquo;lanish
            <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
