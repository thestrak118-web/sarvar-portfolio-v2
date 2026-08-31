import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SocialProof } from "@/components/sections/SocialProof";
import { placeOf } from "@/data/layout";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Presence",
  description: profile.intro,
};

export default function SocialProofPage() {
  // The section only owns a route while it is set to "alohida sahifa".
  if (placeOf("social") !== "page") notFound();

  return (
    <>
      <div className="pt-16" />
      <SocialProof index="" />
    </>
  );
}
