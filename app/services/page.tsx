import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesGrid from "@/components/services/ServicesGrid";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web design, e-commerce, SEO, copywriting, full-stack development, and brand identity services from Nairobi's premier digital agency.",
};

export default function ServicesPage() {
  return (
    <main>
      <Navbar />
      <section className="pb-12 pt-32">
        <div className="mx-auto max-w-7xl px-6">
          <p className="font-heading text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Our Services
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
            <span className="text-balance">
              Everything you need to{" "}
              <span className="text-primary">dominate</span> online
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            From concept to launch, we deliver end-to-end digital solutions
            tailored for ambitious African businesses.
          </p>
        </div>
      </section>
      <ServicesGrid />
      <Footer />
    </main>
  );
}
