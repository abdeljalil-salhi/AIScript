// Dependencies
import { FC } from "react";
import { App as AntdApp } from "antd";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Refine } from "@refinedev/core";
import { RefineKbarProvider } from "@refinedev/kbar";
import { DevtoolsProvider } from "@refinedev/devtools";

// Contexts
import { ColorModeContextProvider } from "./contexts/color-mode";
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
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "UKx02D-lCzBz4-flgSXL",
                }}
              >
                <Routes>
                  <Route index element={<LandingPage />} />
                </Routes>
              </Refine>
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </Router>
  );
};
