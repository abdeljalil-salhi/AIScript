// Dependencies
import { FC } from "react";

// Components
import { Header } from "./Header";
import { Showcase } from "./Showcase";

// Interfaces
interface HomePageProps {}

/**
 * Home Page Component
 *
 * @interface HomePageProps
 * @returns {JSX.Element} - Home Page Component
 * @exports HomePage
 */
export const HomePage: FC<HomePageProps> = (): JSX.Element => {
  return (
    <div className="p-4 md:p-6 w-full h-[calc(100vh-3.5rem)] md:h-screen flex flex-col gap-6 overflow-y-auto">
      <Header />
      <Showcase />
    </div>
  );
};
