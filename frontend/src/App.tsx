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
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// Config
import { resources } from "./config/resources";
// Constants
import { subscriptionInitialOptions } from "./constants/checkout";
// Contexts
import { ColorModeContextProvider } from "./contexts/color-mode";
// Providers
import { authProvider, dataProvider, liveProvider } from "./providers";
// Components
import { Layout } from "./components/layout";
// Pages
import { CheckoutPage } from "./pages/checkout";
import { CheckoutCancelPage } from "./pages/checkout/cancel";
import { CheckoutSuccessPage } from "./pages/checkout/success";
import { CreatePage } from "./pages/create";
import { Error404Page } from "./pages/404";
import { HomePage } from "./pages/home";
import { LandingPage } from "./pages/landing";
import { LibraryPage } from "./pages/library";
import { LoadingPage } from "./pages/loading";
import { LoginPage } from "./pages/login";
import { PricingPage } from "./pages/pricing";
import { ProfilePage } from "./pages/profile";
import { RegisterPage } from "./pages/register";
import { SubscriptionPage } from "./pages/subscription";
import { SubscriptionCancelPage } from "./pages/subscription/cancel";
import { VerifyEmailPage } from "./pages/verify-email";
import { Verify2FAPage } from "./pages/verify-2fa";
import { SocketContextProvider } from "./contexts/socket";
import { QueueModal } from "./pages/QueueModal";
import { ViewPage } from "./pages/view";

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
                    <Routes>
                      <Route index element={<LandingPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/2fa" element={<Verify2FAPage />} />
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
                        <Route path="/subscription">
                          <Route index element={<SubscriptionPage />} />
                        </Route>
                        <Route path="/view">
                          <Route
                            index
                            element={<CatchAllNavigate to="/library" />}
                          />
                          <Route path=":id" element={<ViewPage />} />
                        </Route>
                        <Route path="/404" element={<Error404Page />} />
                        <Route
                          path="*"
                          element={<CatchAllNavigate to="/404" />}
                        />
                      </Route>
                      <Route
                        element={
                          <Authenticated
                            key={"authenticated-layout"}
                            loading={<LoadingPage />}
                            fallback={<CatchAllNavigate to="/login" />}
                          >
                            <Outlet />
                          </Authenticated>
                        }
                      >
                        <Route path="/checkout">
                          <Route
                            index
                            element={<CatchAllNavigate to="/pricing" />}
                          />
                          <Route path=":planId" element={<CheckoutPage />} />
                          <Route path="success">
                            <Route
                              index
                              element={<CatchAllNavigate to="/pricing" />}
                            />
                            <Route
                              path=":orderId"
                              element={<CheckoutSuccessPage />}
                            />
                          </Route>
                          <Route path="cancel">
                            <Route
                              index
                              element={<CatchAllNavigate to="/pricing" />}
                            />
                            <Route
                              path=":orderId"
                              element={<CheckoutCancelPage />}
                            />
                          </Route>
                        </Route>
                        <Route path="/subscription">
                          <Route
                            path="cancel"
                            element={<SubscriptionCancelPage />}
                          />
                        </Route>
                        <Route path="/verify-email">
                          <Route
                            index
                            element={<CatchAllNavigate to="/profile" />}
                          />
                          <Route path=":token" element={<VerifyEmailPage />} />
                        </Route>
                      </Route>
                    </Routes>
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
