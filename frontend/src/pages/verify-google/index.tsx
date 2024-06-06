// Dependencies
import { FC, MutableRefObject, useEffect, useRef } from "react";
import { Spin } from "antd";
import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useNotification } from "@refinedev/core";
import { useDocumentTitle } from "@refinedev/react-router-v6";

// Utils
import { getCookie } from "@/utils/getCookie";
import { deleteCookie } from "@/utils/deleteCookie";

// Interfaces
interface VerifyGooglePageProps {}

/**
 * Verify Google Page Component
 *
 * @interface VerifyGooglePageProps
 * @returns {JSX.Element} - VerifyGooglePage Component
 * @exports VerifyGooglePage
 */
export const VerifyGooglePage: FC<VerifyGooglePageProps> = (): JSX.Element => {
  useDocumentTitle("AIScript - Google Verification");

  /**
   * Effect ran reference to check if the effect has run
   * @type {MutableRefObject<boolean>}
   */
  const effectRan: MutableRefObject<boolean> = useRef(false);

  /**
   * Location hook to get the current location
   * @type {Location}
   */
  const location: Location = useLocation();

  /**
   * Notification hook to show notifications to the user
   */
  const { open } = useNotification();

  /**
   * Navigate function for redirecting to other pages
   * @type {NavigateFunction}
   * @function
   */
  const navigate: NavigateFunction = useNavigate();

  /**
   * Hook to check the Google OAuth response and redirect the user accordingly.
   */
  useEffect(() => {
    if (effectRan.current) return; // If effect has run, return early
    effectRan.current = true; // Set effect ran to true

    const checkAuth = async () => {
      // Get the URL search params
      const params: URLSearchParams = new URLSearchParams(location.search);

      // Check if the URL has an error parameter
      if (params.has("error")) {
        // Get the error code from the URL
        const errorCode: number = Number(params.get("error"));

        /**
         * Check the error code and show the appropriate notification and redirect the user accordingly.
         * @param {number} errorCode - The error code to check.
         *
         * The error codes are as follows (based on the error code returned from the backend):
         * 1: The user must provide a valid Google profile to proceed with the login process.
         * 2: The email is already registered and is not a Google account.
         * 0: An error occured when trying to sign you in using Google.
         */
        switch (errorCode) {
          case 1:
            open?.({
              type: "error",
              description: "Something went wrong",
              message:
                "You must provide a valid Google profile to proceed with the login process. Please try again.",
              key: "google_login_error",
            });
            navigate("/login", { replace: true });
            break;

          case 2:
            open?.({
              type: "error",
              description: "Something went wrong",
              message:
                "This email is already registered and is not a Google account. Please try logging in using your email and password.",
              key: "google_login_error",
            });
            navigate("/login", { replace: true });
            break;

          default:
            open?.({
              type: "error",
              description: "Something went wrong",
              message:
                "An error occured when trying to sign you in using Google. Please try again.",
              key: "google_login_error",
            });
            navigate("/login", { replace: true });
            break;
        }

        return;
      }

      // Check if the URL has a two-factor authentication (2FA) parameter
      if (params.has("2fa")) {
        const is2faEnabled: boolean = params.get("2fa") === "1";

        // Check if 2FA is enabled
        if (is2faEnabled) {
          // Get the short-lived token from the cookies
          const shortLivedToken: string | null | undefined =
            getCookie("short_lived_token");

          // Check if the short-lived token exists
          if (shortLivedToken) {
            localStorage.setItem("short_lived_token", shortLivedToken);

            deleteCookie("short_lived_token");

            // Redirect the user to the 2FA page with the short-lived token
            navigate("/2fa", { replace: true });

            return;
          } else {
            // Show an error notification in case the short-lived token is not found
            open?.({
              type: "error",
              description: "Something went wrong",
              message:
                "We couldn't find the short lived token. Please try again.",
              key: "short_lived_token_error",
            });

            // Redirect the user to the login page to try again
            navigate("/login", { replace: true });

            return;
          }
        }

        // Get the access token from the cookies
        const accesToken: string | null | undefined = getCookie("access_token");

        // Check if the access token exists
        if (accesToken) {
          localStorage.setItem("access_token", accesToken);

          deleteCookie("access_token");

          // Redirect the user to the home page with the access token
          navigate("/home", { replace: true });

          return;
        } else {
          // Show an error notification in case the access token is not found
          open?.({
            type: "error",
            description: "Something went wrong",
            message: "We couldn't find the access token. Please try again.",
            key: "access_token_error",
          });

          // Redirect the user to the login page to try again
          navigate("/login", { replace: true });
        }
      }
    };

    checkAuth();
  }, [location.search, navigate, open]);

  return (
    <>
      <Helmet>
        <title>AIScript - Google Verification</title>
        <meta
          name="description"
          content="Verify your Google account to proceed with the login process."
        />
      </Helmet>

      <div className="w-screen h-screen flex items-center justify-center">
        <Spin />
      </div>
    </>
  );
};
