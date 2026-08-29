import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Experience } from "@/components/sections/Experience";
import { PageNav } from "@/components/site/PageNav";
import { placeOf } from "@/data/layout";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Experience",
  description: profile.intro,
};

export default function ExperiencePage() {
  // The section only owns a route while it is set to "alohida sahifa".
  if (placeOf("experience") !== "page") notFound();

  return (
    <>
      <div className="pt-16" />
      <Experience index="" />
      <PageNav current="experience" />
    </>
  );
}
