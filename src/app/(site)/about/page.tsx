import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { placeOf } from "@/data/layout";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "About",
  description: profile.intro,
};

export default function AboutPage() {
  // The section only owns a route while it is set to "alohida sahifa".
  if (placeOf("about") !== "page") notFound();

  return (
    <>
      <div className="pt-16" />
      <About index="" />
    </>
  );
}
