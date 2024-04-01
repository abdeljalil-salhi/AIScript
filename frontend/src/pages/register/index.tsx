// Dependencies
import { FC } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

// SVGs
import { ButtonGradient } from "@/assets/svg/ButtonGradient";
// Components
import { LeftSide } from "@/components/auth/LeftSide";
import { RightSide } from "@/components/auth/RightSide";

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
  return (
    <HelmetProvider>
      <Helmet>
        <title>AIScript | Register</title>
        <meta
          name="description"
          content="Register on AIScript to write e-books in seconds."
        />
      </Helmet>
      <div className="overflow-hidden flex items-center justify-center min-h-screen font-['Poppins']">
        <div className="relative flex flex-col m-6 space-y-8 bg-n-7 shadow-2xl rounded-2xl p-1.5 md:flex-row md:space-y-0">
          <LeftSide page="register" />
          <RightSide page="register" />
        </div>
      </div>
      <ButtonGradient />
    </HelmetProvider>
  );
};
