// Dependencies
import { FC } from "react";

// Assets
import { gradient } from "../../assets";

// Interfaces
interface GradientProps {}

/**
 * Gradient Component
 *
 * @interface GradientProps
 * @returns {JSX.Element} - Gradient Component
 * @exports Gradient
 */
export const Gradient: FC<GradientProps> = (): JSX.Element => {
  return (
    <div className="absolute top-[18.25rem] -left-[30.375rem] w-[56.625rem] opacity-60 mix-blend-color-dodge pointer-events-none">
      <div className="absolute top-1/2 left-1/2 w-[58.85rem] h-[58.85rem] -translate-x-3/4 -translate-y-1/2">
        <img
          className="w-full"
          src={gradient}
          width={942}
          height={942}
          alt="Gradient"
        />
      </div>
    </div>
  );
};
