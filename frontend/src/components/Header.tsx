// Dependencies
import { FC } from "react";

import brainwave from "../assets/brainwave.svg";

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
    <div className="fixed top-0 z-50 bg-n-8/90 backdrop-blur-sm border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm">
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[12rem] xl:mr-8" href="#hero">
          <img src={brainwave} width={190} height={40} alt="AIScript" />
        </a>
      </div>
    </div>
  );
};
