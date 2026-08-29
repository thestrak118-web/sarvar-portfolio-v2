import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Research } from "@/components/sections/Research";
import { PageNav } from "@/components/site/PageNav";
import { placeOf } from "@/data/layout";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Research",
  description: profile.intro,
};

export default function ResearchPage() {
  // The section only owns a route while it is set to "alohida sahifa".
  if (placeOf("research") !== "page") notFound();

  return (
    <>
      <div className="pt-16" />
      <Research index="" />
      <PageNav current="research" />
    </>
  );
}
