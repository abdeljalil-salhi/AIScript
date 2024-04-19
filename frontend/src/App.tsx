// Dependencies
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { FC } from "react";
import { App as AntdApp } from "antd";
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { useNotificationProvider } from "@refinedev/antd";

// Config
import { resources } from "./config/resources";
// Contexts
import { ColorModeContextProvider } from "./contexts/color-mode";
// Providers
import { authProvider, dataProvider, liveProvider } from "./providers";
// Components
import { Layout } from "./components/layout";
// Pages
import { CreatePage } from "./pages/create";
import { HomePage } from "./pages/home";
import { LandingPage } from "./pages/landing";
import { LibraryPage } from "./pages/library";
import { LoadingPage } from "./pages/loading";
import { LoginPage } from "./pages/login";
import { PricingPage } from "./pages/pricing";
import { ProfilePage } from "./pages/profile";
import { RegisterPage } from "./pages/register";

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
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route
                    element={
                      <Authenticated
                        key={"authenticated-layout"}
                        loading={<LoadingPage />}
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <Layout>
                          <Outlet />
                        </Layout>
                      </Authenticated>
                    }
                  >
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/create" element={<CreatePage />} />
                    <Route path="/library" element={<LibraryPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                  </Route>
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
