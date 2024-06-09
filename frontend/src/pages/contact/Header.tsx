// Dependencies
import { FC } from "react";

// Interfaces
interface HeaderProps {}

/**
 * Contact Header Component
 *
 * @interface HeaderProps
 * @returns {JSX.Element} - Header Component
 * @exports Header
 */
export const Header: FC<HeaderProps> = (): JSX.Element => {
  return (
    <header className="!pl-0 p-4 md:p-6 w-full max-w-xl">
      <h2 className="font-semibold text-4xl font-['Poppins']">Contact Us</h2>
    </header>
  );
};
