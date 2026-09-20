import { notFound } from "next/navigation";
import { allStudies, getStudy } from "@/data/case-studies";
import { CaseStudy } from "@/components/portfolio/Portfolio";
import { pageMetadata, siteUrl } from "@/lib/site-metadata";
export function generateStaticParams() { return allStudies.map(study => ({ slug: study.slug })); }
export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getStudy(slug);
  if (!study) return { title: "Loyiha topilmadi" };
  return pageMetadata(study.title, study.summary, `/work/${study.slug}`);
}
export default async function CasePage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getStudy(slug);
  if (!study) notFound();
  const schema = { "@context": "https://schema.org", "@type": "CreativeWork", name: study.title, description: study.summary, url: `${siteUrl}/work/${study.slug}`, author: { "@type": "Person", name: "Sarvar Tolipov", url: siteUrl }, inLanguage: "uz" };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /><CaseStudy study={study} /></>;
}
