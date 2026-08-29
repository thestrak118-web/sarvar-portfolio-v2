"use client";

import { useEffect, useState } from "react";

/** Tracks which section id currently owns the viewport, for nav highlighting. */
export function useActiveSection(ids: string[], offset = 0.35) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
      // Nav order does not have to match document order — sort so the
      // "last section above the line" test is meaningful.
      .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
    if (!sections.length) return;

    const onScroll = () => {
      const line = window.innerHeight * offset;
      // Nothing is active while the hero still owns the viewport.
      let current = "";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, offset]);

  return active;
}
