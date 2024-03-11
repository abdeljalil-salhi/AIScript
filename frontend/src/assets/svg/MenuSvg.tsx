// Dependencies
import { FC } from "react";

// Interfaces
interface MenuSvgProps {
  openNavigation: boolean;
}

/**
 * MenuSvg Component
 *
 * @interface MenuSvgProps
 * @returns {JSX.Element} - MenuSvg Component
 * @exports MenuSvg
 */
export const MenuSvg: FC<MenuSvgProps> = ({ openNavigation }): JSX.Element => {
  return (
    <svg
      className="overflow-visible"
      width="20"
      height="12"
      viewBox="0 0 20 12"
    >
      <rect
        className="transition-all origin-center"
        y={openNavigation ? "5" : "0"}
        width="20"
        height="2"
        rx="1"
        fill="white"
        transform={`rotate(${openNavigation ? "45" : "0"})`}
      />
      <rect
        className="transition-all origin-center"
        y={openNavigation ? "5" : "10"}
        width="20"
        height="2"
        rx="1"
        fill="white"
        transform={`rotate(${openNavigation ? "-45" : "0"})`}
      />
    </svg>
  );
};
