import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Skills } from "@/components/sections/Skills";
import { placeOf } from "@/data/layout";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Skills",
  description: profile.intro,
};

export default function SkillsPage() {
  // The section only owns a route while it is set to "alohida sahifa".
  if (placeOf("skills") !== "page") notFound();

  return (
    <>
      <div className="pt-16" />
      <Skills index="" />
    </>
  );
}
