// Dependencies
import { FC } from "react";

// SVGs
import ButtonGradient from "./assets/svg/ButtonGradient";

// Components
import { Header } from "./components/Header";

// Interfaces
interface AppProps {}

/**
 * App component
 *
 * @returns {JSX.Element} - App component
 * @exports App
 */
export const App: FC<AppProps> = (): JSX.Element => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header></Header>
      </div>
      <ButtonGradient />
    </>
  );
};
