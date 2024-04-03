// Dependencies
import { FC } from "react";

// Interfaces
interface GradientLightProps {}

/**
 * Gradient Light Component
 *
 * @interface GradientLightProps
 * @returns {JSX.Element} - Gradient Light Component
 * @exports GradientLight
 */
export const GradientLight: FC<GradientLightProps> = (): JSX.Element => {
  return (
    <div className="absolute top-0 left-1/4 w-full aspect-square bg-radial-gradient from-[#28206C] to-[#28206C]/0 to-70% pointer-events-none" />
  );
};
