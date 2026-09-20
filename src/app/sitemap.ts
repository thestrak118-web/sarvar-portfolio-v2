import type { MetadataRoute } from "next";
import { allStudies } from "@/data/case-studies";
import { siteUrl } from "@/lib/site-metadata";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/work",
    "/experience",
    "/skills",
    "/about",
    "/certifications",
    "/contact",
    ...allStudies.map((study) => `/work/${study.slug}`),
  ].map((path) => ({ url: `${siteUrl}${path}` }));
}
