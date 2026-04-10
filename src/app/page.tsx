import Navbar from "@/layout/Navbar";
import HeroSection from "@/sections/HeroSection";
import TrustStrip from "@/sections/TrustStrip";
import AboutSection from "@/sections/AboutSection";
import ServicesSection from "@/sections/ServicesSection";
import PortfolioSection from "@/sections/PortfolioSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import ProcessSection from "@/sections/ProcessSection";
import CTASection from "@/sections/CTASection";
import Footer from "@/layout/Footer";

export default function Home() {
  return (
    <main className="bg-(--bg)">
      <Navbar />
      <HeroSection />
      <TrustStrip />
      <AboutSection />
      <TestimonialsSection />
      <PortfolioSection />
      <ServicesSection />
      <ProcessSection />
      <CTASection />
      <Footer />
    </main>
  );
}
