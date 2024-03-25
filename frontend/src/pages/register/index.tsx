// Dependencies
import { FC } from "react";

// SVGs
import { ButtonGradient } from "@/assets/svg/ButtonGradient";
// Components
import { LeftSide } from "@/components/auth/LeftSide";

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
    <>
      <div className="overflow-hidden flex items-center justify-center min-h-screen">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <LeftSide />
        </div>
      </div>
      <ButtonGradient />
    </>
  );
};
