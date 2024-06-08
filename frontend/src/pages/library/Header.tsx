// Dependencies
import { FC } from "react";

// Interfaces
interface HeaderProps {}

/**
 * Header Component
 *
 * @interface HeaderProps
 * @returns {JSX.Element} - Header Component
 * @exports Header
 */
export const Header: FC<HeaderProps> = (): JSX.Element => {
  return (
    <header className="p-4 md:p-6 w-full">
      <h2 className="font-semibold text-4xl font-['Poppins']">Library</h2>
    </header>
  );
};
