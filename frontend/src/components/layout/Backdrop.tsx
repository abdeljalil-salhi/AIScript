// Dependencies
import { FC } from "react";

// Interfaces
interface BackdropProps {
  onClick: () => void;
  zIndex?: number;
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
  zIndex = 10,
}): JSX.Element => {
  return (
    <div
      className={`block md:hidden fixed top-0 left-0 bottom-0 right-0 z-${zIndex}`}
      onClick={onClick}
    ></div>
  );
};
