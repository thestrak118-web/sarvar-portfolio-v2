import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Certifications } from "@/components/sections/Certifications";
import { placeOf } from "@/data/layout";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Certifications",
  description: profile.intro,
};

export default function CertificationsPage() {
  // The section only owns a route while it is set to "alohida sahifa".
  if (placeOf("certifications") !== "page") notFound();

  return (
    <>
      <div className="pt-16" />
      <Certifications index="" />
    </>
  );
}
