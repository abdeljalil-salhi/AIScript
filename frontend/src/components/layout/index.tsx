// Dependencies
import { FC, ReactNode } from "react";

// Components
import { Sidebar } from "./Sidebar";

// Interfaces
interface LayoutProps {
  children: ReactNode;
}

/**
 * Layout Component
 *
 * @interface LayoutProps
 * @returns {JSX.Element} - Layout Component
 * @exports Layout
 */
export const Layout: FC<LayoutProps> = ({ children }): JSX.Element => {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-between min-h-screen">
      <Sidebar />
      <main className="w-full">{children}</main>
    </div>
  );
};
