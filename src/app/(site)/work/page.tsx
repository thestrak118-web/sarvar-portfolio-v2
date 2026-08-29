import type { Metadata } from "next";
import { SecurityWork } from "@/components/sections/SecurityWork";
import { PageNav } from "@/components/site/PageNav";

export const metadata: Metadata = {
  title: "Security Work",
  description:
    "Offensive Security UGC mashinalari va assessmentlar — har biri sakkiz bosqichli case study bilan.",
};

/** The work index always exists — it is the backbone of the portfolio. */
export default function WorkPage() {
  return (
    <>
      <div className="pt-16" />
      <SecurityWork index="" />
      <PageNav current="work" />
    </>
  );
}
