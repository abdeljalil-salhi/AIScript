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
    <div className="flex flex-row">
      <Sidebar />
      <main className="p-5">{children}</main>
    </div>
  );
};
