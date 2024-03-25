// Dependencies
import { FC } from "react";

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
    <>
      <div className="overflow-hidden flex items-center justify-center min-h-screen font-['Poppins']">
        <div className="relative flex flex-col m-6 space-y-8 bg-n-7 shadow-2xl rounded-2xl p-1.5 md:flex-row md:space-y-0">
          <LeftSide />
          <RightSide />
        </div>
      </div>
      <ButtonGradient />
    </>
  );
};
