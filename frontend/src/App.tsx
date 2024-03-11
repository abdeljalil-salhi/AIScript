// Dependencies
import { FC } from "react";

// SVGs
import { ButtonGradient } from "./assets/svg/ButtonGradient";

// Components
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";

// Interfaces
interface AppProps {}

/**
 * App component
 *
 * @interface AppProps
 * @returns {JSX.Element} - App component
 * @exports App
 */
export const App: FC<AppProps> = (): JSX.Element => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
      </div>
      <ButtonGradient />
    </>
  );
};
