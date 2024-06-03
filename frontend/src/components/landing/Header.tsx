// Dependencies
import { FC, useState } from "react";
import { Link, Location, useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

// Assets
import { AIScriptLogo } from "@/assets/landing";
// Constants
import { navigations } from "@/constants";
import { Navigation } from "@/constants/types";
// SVGs
import { MenuSvg } from "@/assets/svg/MenuSvg";
// Components
import { Button } from "./Button";
import { HamburgerMenu } from "./design/Header";
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
  /**
   * State to toggle the navigation menu
   * @type {boolean}
   * @default false
   */
  const [openNavigation, setOpenNavigation] = useState<boolean>(false);

  /**
   * Get the current pathname
   * @type {Location<any>}
   */
  const pathname: Location = useLocation();

  /**
   * Toggle the navigation menu when the hamburger menu is clicked
   * and disable/enable page scroll when the navigation menu is open/closed
   *
   * @returns {void}
   */
  const toggleNavigation = (): void => {
    openNavigation ? enablePageScroll() : disablePageScroll();
    setOpenNavigation(!openNavigation);
  };

  /**
   * Close the navigation menu when a link is clicked
   * and enable page scroll
   *
   * @returns {void}
   */
  const handleClick = (): void => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a
          href="/#hero"
          onClick={handleClick}
          className="block w-[12rem] xl:mr-8"
          draggable={false}
        >
          <img
            src={AIScriptLogo}
            height={40}
            alt="AIScript"
            draggable={false}
          />
        </a>
        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigations.map((item: Navigation) => (
              <a
                href={item.url}
                key={item.id}
                onClick={handleClick}
                className={`block relative font-grotesk text-2xl uppercase text-n-1 transition-colors hover:text-purple-300 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === pathname.hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12 active:text-n-1/75 lg:tracking-wider`}
                draggable={false}
              >
                {item.title}
              </a>
            ))}
          </div>
          <HamburgerMenu />
        </nav>
        <Link
          to="/register"
          className="button font-grotesk hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block active:text-n-1/75 lg:tracking-wider"
          draggable={false}
        >
          Sign up
        </Link>
        <Button
          className="hidden font-grotesk lg:flex"
          href="/login"
        >
          Log in
        </Button>
        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};
