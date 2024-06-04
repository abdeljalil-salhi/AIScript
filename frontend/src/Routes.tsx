// Dependencies
import { FC } from "react";
import { Outlet, Route, Routes as RouterRoutes } from "react-router-dom";
import { Authenticated } from "@refinedev/core";
import { CatchAllNavigate } from "@refinedev/react-router-v6";

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
import { ViewPage } from "./pages/view";
import { ForgotPasswordPage } from "./pages/forgot-password";
import { VerifyResetToken } from "./pages/forgot-password/VerifyResetToken";
import { VerifyGooglePage } from "./pages/verify-google";

// Interfaces
interface RoutesProps {}

/**
 * App routes;
 * It contains all the routes of the application.
 *
 * @interface RoutesProps
 * @returns {JSX.Element} - Routes Component
 * @exports Routes
 */
export const Routes: FC<RoutesProps> = (): JSX.Element => {
  return (
    <RouterRoutes>
      <Route index element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/2fa" element={<Verify2FAPage />} />
      <Route path="/google" element={<VerifyGooglePage />} />
      <Route path="/forgot-password">
        <Route index element={<ForgotPasswordPage />} />
        <Route path=":token" element={<VerifyResetToken />} />
      </Route>
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
          <Route index element={<CatchAllNavigate to="/library" />} />
          <Route path=":bookId" element={<ViewPage />} />
        </Route>
        <Route path="/404" element={<Error404Page />} />
        <Route path="*" element={<CatchAllNavigate to="/404" />} />
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
          <Route index element={<CatchAllNavigate to="/pricing" />} />
          <Route path=":planId" element={<CheckoutPage />} />
          <Route path="success">
            <Route index element={<CatchAllNavigate to="/pricing" />} />
            <Route path=":orderId" element={<CheckoutSuccessPage />} />
          </Route>
          <Route path="cancel">
            <Route index element={<CatchAllNavigate to="/pricing" />} />
            <Route path=":orderId" element={<CheckoutCancelPage />} />
          </Route>
        </Route>
        <Route path="/subscription">
          <Route path="cancel" element={<SubscriptionCancelPage />} />
        </Route>
        <Route path="/verify-email">
          <Route index element={<CatchAllNavigate to="/profile" />} />
          <Route path=":token" element={<VerifyEmailPage />} />
        </Route>
      </Route>
    </RouterRoutes>
  );
};
