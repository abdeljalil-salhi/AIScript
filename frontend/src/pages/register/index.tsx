// Dependencies
import { FC } from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useIsAuthenticated } from "@refinedev/core";

// SVGs
import { ButtonGradient } from "@/assets/svg/ButtonGradient";
// Components
import { LeftSide } from "@/components/auth/LeftSide";
import { RightSide } from "@/components/auth/RightSide";
import { Gradient } from "@/components/landing/Gradient";
// Pages
import { LoadingPage } from "../loading";

// Interfaces
interface RegisterPageProps {}

/**
 * Register Page Component
 *
 * @interface RegisterPageProps
 * @returns {JSX.Element} - Register Page Component
 * @exports RegisterPage
 */
export const RegisterPage: FC<RegisterPageProps> = (): JSX.Element => {
  // The `useIsAuthenticated` hook is used to check if the user is authenticated or not.
  const { data: auth, isLoading } = useIsAuthenticated();

  // If the user is authenticated and the page is not loading, redirect the user to the home page.
  if (auth?.authenticated && !isLoading) {
    return <Navigate to="/home" />;
  }

  return (
    <>
      <Helmet>
        <title>
          Create your AIScript account - Join the future of AI writing today
        </title>
        <meta
          name="description"
          content="Unlock the power of AI with AIScript. Instantly generate high-quality books and custom covers. Experience effortless writing, seamless integration, and secure, fast results. Join the future of book creation today."
        />
      </Helmet>

      {/* The `isLoading` state is used to show a loading page while we are checking if the user is authenticated or not. */}
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="overflow-hidden flex items-center justify-center min-h-screen font-['Poppins']">
          <Gradient />
          <div className="relative flex flex-col m-6 space-y-8 bg-n-7 shadow-2xl rounded-2xl p-1.5 md:flex-row md:space-y-0">
            <LeftSide page="register" />
            <RightSide page="register" />
          </div>
        </div>
      )}
      <ButtonGradient />
    </>
  );
};
