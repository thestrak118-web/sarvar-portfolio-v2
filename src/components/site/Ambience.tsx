"use client";

import { useEffect } from "react";

/**
 * Pointer-tracked spotlight + top scroll progress rail.
 * Both are CSS-variable driven and rAF-throttled: no React re-renders.
 */
export function Ambience() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--mx", `${event.clientX}px`);
        root.style.setProperty("--my", `${event.clientY}px`);
        frame = 0;
      });
    };

    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      root.style.setProperty("--scroll", String(max > 0 ? window.scrollY / max : 0));
    };

    if (fine && !reduce) window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="spotlight hidden lg:block" aria-hidden />
      <div className="fixed inset-x-0 top-0 z-60 h-px bg-transparent" aria-hidden>
        <div
          className="h-px origin-left bg-gradient-to-r from-acid/0 via-acid to-cyan/70"
          style={{ transform: "scaleX(var(--scroll, 0))" }}
        />
      </div>
    </>
  );
}
