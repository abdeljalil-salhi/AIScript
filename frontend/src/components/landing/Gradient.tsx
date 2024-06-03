// Dependencies
import { FC } from "react";

// Assets
import { Gradient as GradientBackground } from "@/assets/landing";

// Interfaces
interface GradientProps {}

/**
 * Gradient Component;
 * It shows a blue to purple gradient background.
 *
 * @interface GradientProps
 * @returns {JSX.Element} - Gradient Component
 * @exports Gradient
 */
export const Gradient: FC<GradientProps> = (): JSX.Element => {
  return (
    <div className="overflow-hidden absolute top-0 w-full h-full opacity-50 mix-blend-color-dodge pointer-events-none">
      <img
        className="absolute top-1/4 left-1/4 w-[60rem] max-w-[60rem] h-[62rem] -translate-x-1/2 -translate-y-1/2"
        width={906}
        height={906}
        src={GradientBackground}
        alt="Gradient"
      />
    </div>
  );
};
