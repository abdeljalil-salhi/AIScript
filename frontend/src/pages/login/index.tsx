// Dependencies
import { FC } from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useIsAuthenticated } from "@refinedev/core";
import { useDocumentTitle } from "@refinedev/react-router-v6";

// SVGs
import { ButtonGradient } from "@/assets/svg/ButtonGradient";
// Components
import { LeftSide } from "@/components/auth/LeftSide";
import { RightSide } from "@/components/auth/RightSide";
import { Gradient } from "@/components/landing/Gradient";
// Pages
import { LoadingPage } from "../loading";

// Interfaces
interface LoginPageProps {}

/**
 * Login Page Component
 *
 * @interface LoginPageProps
 * @returns {JSX.Element} - Login Page Component
 * @exports LoginPage
 */
export const LoginPage: FC<LoginPageProps> = (): JSX.Element => {
  useDocumentTitle("Login to AIScript - Access Your AI Book Creation Hub");

  // The `useIsAuthenticated` hook is used to check if the user is authenticated or not.
  const { data: auth, isLoading } = useIsAuthenticated();

  // If the user is authenticated and the page is not loading, redirect the user to the home page.
  if (auth?.authenticated && !isLoading) {
    return <Navigate to="/home" />;
  }

  return (
    <>
      <Helmet>
        <title>Login to AIScript - Access Your AI Book Creation Hub</title>
        <meta
          name="description"
          content="Login to your AIScript account to access your AI-powered book creation hub. Start generating high-quality books and custom covers effortlessly."
        />
      </Helmet>

      {/* The `isLoading` state is used to show a loading page while we are checking if the user is authenticated or not. */}
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="overflow-hidden flex items-center justify-center min-h-screen font-['Poppins']">
          <Gradient />
          <div className="relative flex flex-col m-6 space-y-8 bg-n-7 shadow-2xl rounded-2xl p-1.5 md:flex-row md:space-y-0">
            <LeftSide page="login" />
            <RightSide page="login" />
          </div>
        </div>
      )}
      <ButtonGradient />
    </>
  );
};
