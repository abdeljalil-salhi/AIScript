// Dependencies
import { FC, ReactNode } from "react";

// SVGs
import { Brackets } from "@/assets/svg/Brackets";

// Interfaces
interface TaglineProps {
  className?: string;
  children?: ReactNode;
}

/**
 * Tagline Component
 *
 * @interface TaglineProps
 * @returns {JSX.Element} - Tagline Component
 * @exports Tagline
 */
export const Tagline: FC<TaglineProps> = ({
  children,
  className,
}): JSX.Element => {
  return (
    <div className={`tagline flex items-center ${className || ""}`}>
      <Brackets position="left" />
      <div className="mx-3 text-n-3">{children}</div>
      <Brackets position="right" />
    </div>
  );
};
