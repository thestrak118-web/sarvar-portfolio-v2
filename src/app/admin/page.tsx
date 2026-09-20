import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { readAllContent } from "@/lib/admin-content";
import { AdminApp } from "./AdminApp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sayt tahriri",
  robots: { index: false, follow: false },
};

/** Local editing tool. It does not exist in a production build. */
export default async function AdminPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  const content = await readAllContent();
  return <AdminApp initial={content} />;
}
