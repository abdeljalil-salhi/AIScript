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
    <div className="flex flex-col gap-3 items-center justify-center w-full pt-6">
      <h2 className="text-2xl md:text-4xl font-semibold tracking-wide text-n-1">
        My Subscriptions
      </h2>
      <h4 className="text-base md:text-lg text-n-4 tracking-wide">
        View your subscriptions history here.
      </h4>
    </div>
  );
};
