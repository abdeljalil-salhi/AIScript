// Dependencies
import { FC } from "react";

// Interfaces
interface BackdropProps {
  onClick: () => void;
  dark?: boolean;
  zIndex?: number;
  mobileOnly?: boolean;
}

/**
 * Backdrop Component
 * @description A backdrop component that can be used to close modals, dropdowns, etc.
 *
 * @interface BackdropProps
 * @returns {JSX.Element} - Backdrop Component
 * @exports Backdrop
 */
export const Backdrop: FC<BackdropProps> = ({
  onClick,
  dark = false,
  zIndex = 10,
  mobileOnly = false,
}): JSX.Element => {
  return (
    <div
      className={`block${
        mobileOnly ? " md:hidden " : " "
      }fixed top-0 left-0 bottom-0 right-0 z-${zIndex} ${
        dark ? "bg-black/50" : ""
      }`}
      onClick={onClick}
    ></div>
  );
};
