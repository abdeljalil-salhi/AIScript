// Dependencies
import { FC } from "react";
import { Navigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useIsAuthenticated } from "@refinedev/core";

// SVGs
import { ButtonGradient } from "@/assets/svg/ButtonGradient";
// Components
import { Benefits } from "@/components/landing/Benefits";
import { Collaboration } from "@/components/landing/Collaboration";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Pricing } from "@/components/landing/Pricing";
import { Roadmap } from "@/components/landing/Roadmap";
import { Services } from "@/components/landing/Services";
// Pages
import { LoadingPage } from "../loading";

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
  // The `useIsAuthenticated` hook is used to check if the user is authenticated or not.
  const { data: auth, isLoading } = useIsAuthenticated();

  // If the user is authenticated and the page is not loading, redirect the user to the dashboard.
  if (auth?.authenticated && !isLoading) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>AIScript</title>
        <meta
          name="description"
          content="AI Script is a platform that helps you write e-books in seconds."
        />
      </Helmet>
      {/* The `isLoading` state is used to show a loading page while we are checking if the user is authenticated or not. */}
      {isLoading ? (
        <LoadingPage />
      ) : (
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
      )}
      <ButtonGradient />
    </HelmetProvider>
  );
};
