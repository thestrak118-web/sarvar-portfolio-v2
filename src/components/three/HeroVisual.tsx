"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const SecurityCore = dynamic(() => import("./SecurityCore"), { ssr: false });

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

/**
 * Lazily mounts the 3D core: only when it scrolls into view, only after the
 * browser is idle, only when WebGL exists. Complexity drops on small screens.
 */
export function HeroVisual({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  /** null = not mounted yet; otherwise the quality tier to render at. */
  const [mode, setMode] = useState<"high" | "low" | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !hasWebGL()) return;

    // Phones and tablets keep the static fallback: a WebGL scene is not worth
    // the parse/execute budget on a mid-range mobile CPU.
    if (window.matchMedia("(max-width: 899px), (pointer: coarse)").matches) return;

    const idle = (cb: () => void) => {
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(cb, { timeout: 1200 });
        return;
      }
      window.setTimeout(cb, 260);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        idle(() =>
          setMode(window.matchMedia("(min-width: 1280px)").matches ? "high" : "low"),
        );
      },
      { rootMargin: "180px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden>
      {/* Static fallback: visible before mount, and permanently without WebGL. */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          mode ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="absolute inset-[18%] rounded-full border border-white/[0.06]" />
        <div className="absolute inset-[30%] rounded-full border border-white/[0.05]" />
        <div className="absolute inset-[42%] rounded-full bg-[radial-gradient(circle,rgba(195,255,62,0.10),transparent_70%)]" />
      </div>
      {mode ? <SecurityCore quality={mode} /> : null}
    </div>
  );
}
