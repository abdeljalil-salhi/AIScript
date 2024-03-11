// Dependencies
import { FC } from "react";

// Interfaces
interface PlusSvgProps {
  className?: string;
}

/**
 * PlusSvg Component
 *
 * @interface PlusSvgProps
 * @returns {JSX.Element} - PlusSvg Component
 * @exports PlusSvg
 */
export const PlusSvg: FC<PlusSvgProps> = ({ className = "" }): JSX.Element => {
  return (
    <svg className={`${className} || ""`} width="11" height="11" fill="none">
      <path
        d="M7 1a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1H1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V8a1 1 0 0 1 1-1h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H8a1 1 0 0 1-1-1V1z"
        fill="#ada8c4"
      />
    </svg>
  );
};
