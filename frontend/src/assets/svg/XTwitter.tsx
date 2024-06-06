// Dependencies
import { FC } from "react";

// Interfaces
interface XTwitterProps {
  className?: string;
}

/**
 * XTwitter Component
 *
 * @interface XTwitterProps
 * @returns {JSX.Element} - XTwitter Component
 * @exports XTwitter
 */
export const XTwitter: FC<XTwitterProps> = ({ className }): JSX.Element => {
  return (
    <svg
      className={`${className || ""} text-white`}
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
      viewBox="0 0 512 462.799"
    >
      <path
        fill="white"
        fillRule="evenodd"
        d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"
      />
    </svg>
  );
};
