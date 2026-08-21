import { ButtonLink } from "@/components/ButtonLink";
import { ClientsShowcase } from "@/components/ClientsShowcase";
import { ContactShowcase } from "@/components/ContactShowcase";
import { CoreServicesEditorial } from "@/components/CoreServicesEditorial";
import { FaqShowcase } from "@/components/FaqShowcase";
import { HeroScrollTypography } from "@/components/HeroScrollTypography";
import { MetricCards } from "@/components/MetricCards";
import { SolutionsShowcase } from "@/components/SolutionsShowcase";

export default function HomePage() {
  return (
    <div className="home-page">
      <section id="hero" className="coads-hero relative min-h-screen overflow-hidden bg-[#F8FBFF]">
        <video
          className="hero-bg-video"
          src="/bg/background.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />
        <div className="hero-dark-layer" aria-hidden />
        <HeroScrollTypography />
      </section>

      <section className="metric-section">
        <MetricCards />
      </section>

      <CoreServicesEditorial />

      <SolutionsShowcase />

      <FaqShowcase />

      <ClientsShowcase />

      <ContactShowcase />
    </div>
  );
}



