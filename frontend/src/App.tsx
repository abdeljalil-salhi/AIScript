// Dependencies
import { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";

// Pages
import { LandingPage } from "./pages/landing";

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
    <Router>
      <LandingPage />
    </Router>
  );
};
