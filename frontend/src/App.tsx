// Dependencies
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { FC } from "react";
import { App as AntdApp } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { useNotificationProvider } from "@refinedev/antd";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// Config
import { resources } from "./config/resources";
// Constants
import { subscriptionInitialOptions } from "./constants/checkout";
// Contexts
import { ColorModeContextProvider } from "./contexts/color-mode";
// Providers
import { authProvider, dataProvider, liveProvider } from "./providers";
// Pages
import { SocketContextProvider } from "./contexts/socket";
import { QueueModal } from "./pages/QueueModal";

/**
 * @description App routes
 * It contains all the routes of the application
 */
import { Routes } from "./Routes";

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
              <PayPalScriptProvider options={subscriptionInitialOptions}>
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
                  <SocketContextProvider>
                    <Routes />
                    <QueueModal />
                  </SocketContextProvider>
                  <RefineKbar />
                  <UnsavedChangesNotifier />
                  <DocumentTitleHandler />
                </Refine>
                <DevtoolsPanel />
              </PayPalScriptProvider>
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </Router>
  );
};
