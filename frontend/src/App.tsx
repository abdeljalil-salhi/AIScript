// Dependencies
import { FC } from "react";
import { App as AntdApp } from "antd";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Refine } from "@refinedev/core";
import { DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbarProvider } from "@refinedev/kbar";
import { useNotificationProvider } from "@refinedev/antd";
import routerBindings from "@refinedev/react-router-v6";
import dataProvider, { GraphQLClient } from "@refinedev/nestjs-query";
import { IDataContextProvider } from "@refinedev/core/dist/interfaces";

// Contexts
import { ColorModeContextProvider } from "./contexts/color-mode";
// Providers
import { authProvider } from "./providers";
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
  // The GraphQL client used to make requests to the API
  const client: GraphQLClient = new GraphQLClient(
    import.meta.env.VITE_API_URL_GQL
  );
  const gqlDataProvider: Required<IDataContextProvider> = dataProvider(client);

  return (
    <Router>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={gqlDataProvider}
                notificationProvider={useNotificationProvider}
                authProvider={authProvider}
                routerProvider={routerBindings}
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
