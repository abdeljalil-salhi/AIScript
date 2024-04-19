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
    <div className="p-8 w-full flex flex-col gap-6">
      <Header />
      <Showcase />
    </div>
  );
};
