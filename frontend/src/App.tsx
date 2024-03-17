// Dependencies
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { FC } from "react";
import { App as AntdApp } from "antd";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { useNotificationProvider } from "@refinedev/antd";

// Config
import { resources } from "./config/resources";
// Contexts
import { ColorModeContextProvider } from "./contexts/color-mode";
// Providers
import { authProvider, dataProvider, liveProvider } from "./providers";
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
                resources={resources}
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                authProvider={authProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "UKx02D-lCzBz4-flgSXL",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  <Route index element={<LandingPage />} />
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </Router>
  );
};
