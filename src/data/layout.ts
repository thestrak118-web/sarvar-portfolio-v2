import raw from "@/content/layout.json";

export type SectionId =
  | "work"
  | "experience"
  | "skills"
  | "certifications"
  | "statistics"
  | "about"
  | "research"
  | "social"
  | "contact";

/** home = bosh sahifada · page = alohida sahifa · off = ko'rsatilmaydi */
export type Place = "home" | "page" | "off";

export type LayoutSection = {
  id: SectionId;
  label: string;
  place: Place;
  /** Menyudagi nomi. Bo'sh bo'lsa menyuga chiqmaydi. */
  nav: string;
};

export const layoutSections = raw.sections as LayoutSection[];

export const routes: Record<SectionId, string> = {
  work: "/work",
  experience: "/experience",
  skills: "/skills",
  certifications: "/certifications",
  statistics: "/",
  about: "/about",
  research: "/research",
  social: "/presence",
  contact: "/contact",
};

export function section(id: SectionId): LayoutSection | undefined {
  return layoutSections.find((item) => item.id === id);
}

export function placeOf(id: SectionId): Place {
  return section(id)?.place ?? "off";
}

/** Sections rendered on the landing page, in the configured order. */
export const homeSections = layoutSections.filter((item) => item.place === "home");

/** Sections that own a standalone route. */
export const pageSections = layoutSections.filter((item) => item.place === "page");

/** Navigation entries: standalone pages link to routes, home sections to anchors. */
export const navLinks = layoutSections
  .filter((item) => item.nav && item.place !== "off")
  .map((item) => ({
    id: item.id,
    label: item.nav,
    href: item.place === "page" ? routes[item.id] : `/#${item.id}`,
    anchor: item.place === "home",
  }));

const UNNUMBERED: SectionId[] = ["statistics"];

/** "01", "02" … for the sections that stay on the landing page. */
export const homeNumbers: Partial<Record<SectionId, string>> = (() => {
  const map: Partial<Record<SectionId, string>> = {};
  let n = 0;
  for (const item of homeSections) {
    if (UNNUMBERED.includes(item.id)) continue;
    n += 1;
    map[item.id] = String(n).padStart(2, "0");
  }
  return map;
})();

/** Where the Security Work CTA should point, given the current placement. */
export const workHref = placeOf("work") === "home" ? "/#work" : "/work";
