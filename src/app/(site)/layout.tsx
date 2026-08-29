import { Navigation } from "@/components/site/Navigation";
import { Footer } from "@/components/site/Footer";
import { Ambience } from "@/components/site/Ambience";

/** Chrome for the public site. The admin tool deliberately sits outside it. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Ambience />
      <Navigation />
      <main id="main" className="relative">
        {children}
      </main>
      <Footer />
    </>
  );
}
