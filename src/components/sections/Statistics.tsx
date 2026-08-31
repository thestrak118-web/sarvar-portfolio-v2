import { statistics } from "@/data/profile";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";

export function Statistics() {
  return (
    <section
      aria-label="Statistika"
      className="relative overflow-hidden border-t border-line bg-abyss py-16 sm:py-20"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="grid-lines absolute inset-0 opacity-50" />
        <div className="absolute left-1/2 top-1/2 h-[320px] w-[900px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(90,209,255,0.06),transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="label text-acid/80">Raqamlarda</span>
            <span className="h-px flex-1 bg-line" aria-hidden />
          </div>
        </Reveal>

        <ul aria-label="Portfolio statistikasi" className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
          {statistics.map((stat, i) => (
            <Reveal key={stat.label} delay={0.06 * i} as="li">
              <div className="border-l border-line pl-5">
                <p className="tnum text-[clamp(2.4rem,5vw,3.4rem)] font-semibold leading-none tracking-[-0.05em] text-fg">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-4 text-[13.5px] font-medium leading-snug text-fg/85">
                  {stat.label}
                </p>
                <p className="label mt-2">{stat.detail}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
