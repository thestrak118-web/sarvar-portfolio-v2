import "@/app/portfolio.css";
import { Header, ContactGate } from "@/components/portfolio/Interactive";
import { Footer, Contact } from "@/components/portfolio/Portfolio";
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="v2-site">
      <Header />
      <main id="main">
        {children}
        <ContactGate>
          <Contact />
        </ContactGate>
      </main>
      <Footer />
    </div>
  );
}
