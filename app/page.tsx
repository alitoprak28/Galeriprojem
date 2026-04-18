import { ContactSection } from "@/components/sections/contact-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HomeStockSection } from "@/components/sections/home-stock-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SocialProofSection } from "@/components/sections/social-proof-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HomeStockSection />
      <ServicesSection />
      <SocialProofSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
