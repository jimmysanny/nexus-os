import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import TickerBanner from "@/components/home/TickerBanner";
import ServicesSection from "@/components/home/ServicesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import PricingSection from "@/components/home/PricingSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ContactSection from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <TickerBanner />
      <ServicesSection />
      <HowItWorksSection />
      <PortfolioSection />
      <PricingSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
