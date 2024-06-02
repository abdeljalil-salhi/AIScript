// Dependencies
import { FC } from "react";

// Assets
import { Lines, Gradient as GradientBackground } from "@/assets/landing";

// Interfaces
interface LeftLineProps {}
interface RightLineProps {}
interface GradientProps {}

/**
 * LeftLine Component;
 * It shows a line on the left side of the screen.
 *
 * @interface LeftLineProps
 * @returns {JSX.Element} - LeftLine Component
 * @exports LeftLine
 */
export const LeftLine: FC<LeftLineProps> = (): JSX.Element => {
  return (
    <div className="hidden lg:block absolute top-1/2 right-full w-[92.5rem] h-[11.0625rem] -translate-y-1/2 pointer-events-none">
      <img
        className="w-full"
        src={Lines}
        width={1480}
        height={177}
        alt="Lines"
      />
    </div>
  );
};

/**
 * RightLine Component;
 * It shows a line on the right side of the screen.
 *
 * @interface RightLineProps
 * @returns {JSX.Element} - RightLine Component
 * @exports RightLine
 */
export const RightLine: FC<RightLineProps> = (): JSX.Element => {
  return (
    <div className="hidden lg:block absolute top-1/2 left-full w-[92.5rem] h-[11.0625rem] -translate-y-1/2 -scale-x-100 pointer-events-none">
      <img
        className="w-full"
        src={Lines}
        width={1480}
        height={177}
        alt="Lines"
      />
    </div>
  );
};

/**
 * Gradient Component
 *
 * @interface GradientProps
 * @returns {JSX.Element} - Gradient Component
 * @exports Gradient
 */
export const Gradient: FC<GradientProps> = (): JSX.Element => {
  return (
    <div className="absolute top-0 -left-[10rem] w-[56.625rem] h-[56.625rem] opacity-50 mix-blend-color-dodge pointer-events-none">
      <img
        className="absolute top-1/4 left-1/2 w-[60rem] max-w-[60rem] h-[62rem] -translate-x-1/2 -translate-y-1/2"
        src={GradientBackground}
        alt="Gradient"
      />
    </div>
  );
};
