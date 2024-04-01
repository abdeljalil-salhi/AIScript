// Dependencies
import { FC } from "react";

// SVGs
import { ButtonGradient } from "@/assets/svg/ButtonGradient";
// Components
import { Benefits } from "@/components/Benefits";
import { Collaboration } from "@/components/Collaboration";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/Pricing";
import { Roadmap } from "@/components/Roadmap";
import { Services } from "@/components/Services";
import { Helmet, HelmetProvider } from "react-helmet-async";

// Interfaces
interface LandingPageProps {}

/**
 * Landing Page Component
 *
 * @interface LandingPage
 * @returns {JSX.Element} - Landing Page Component
 * @exports LandingPage
 */
export const LandingPage: FC<LandingPageProps> = (): JSX.Element => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>AIScript</title>
        <meta
          name="description"
          content="AI Script is a platform that helps you write e-books in seconds."
        />
      </Helmet>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
        <Benefits />
        <Collaboration />
        <Services />
        <Pricing />
        <Roadmap />
        <Footer />
      </div>
      <ButtonGradient />
    </HelmetProvider>
  );
};
