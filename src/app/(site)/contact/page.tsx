import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { placeOf } from "@/data/layout";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: profile.intro,
};

export default function ContactPage() {
  // The section only owns a route while it is set to "alohida sahifa".
  if (placeOf("contact") !== "page") notFound();

  return (
    <>
      <div className="pt-16" />
      <Contact index="" />
    </>
  );
}
