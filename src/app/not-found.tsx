import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70svh] max-w-[1240px] flex-col justify-center px-5 py-32 sm:px-8">
      <span className="label text-acid/80">404</span>
      <h1 className="mt-5 text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
        No route to host.
      </h1>
      <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
        So&rsquo;ralgan sahifa bu serverda mavjud emas.
      </p>
      <Link
        href="/"
        className="mt-9 inline-flex h-11 w-fit items-center rounded-[10px] border border-acid bg-acid px-5 text-[13px] font-medium text-void transition-colors hover:bg-[#d3ff67]"
      >
        Bosh sahifaga
      </Link>
    </div>
  );
}
