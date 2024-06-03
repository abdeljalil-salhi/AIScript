// Dependencies
import { FC, FormEvent, MouseEvent, useEffect } from "react";
import { Spin } from "antd";
import { Helmet } from "react-helmet-async";
import { Link, Navigate } from "react-router-dom";
import {
  HttpError,
  useCustomMutation,
  useIsAuthenticated,
  useNotification,
} from "@refinedev/core";
import { useDocumentTitle } from "@refinedev/react-router-v6";

// Assets
import { RobotForgotPassword } from "@/assets/forgot-password";
// Components
import { Button } from "@/components/landing/Button";
import { Gradient } from "@/components/landing/Gradient";
// Pages
import { LoadingPage } from "../loading";
// GraphQL Mutations
import { MUTATION_REQUEST_FORGOT_PASSWORD } from "@/graphql/mutations/requestForgotPassword";
// GraphQL Types
import { RequestForgotPasswordMutation } from "@/graphql/types";
// Providers
import { API_URL } from "@/providers";

// Interfaces
interface ForgotPasswordPageProps {}

/**
 * Forgot Password Page Component
 *
 * @interface ForgotPasswordPageProps
 * @returns {JSX.Element} - ForgotPasswordPage Component
 * @exports ForgotPasswordPage
 */
export const ForgotPasswordPage: FC<
  ForgotPasswordPageProps
> = (): JSX.Element => {
    useDocumentTitle("Forgot Password - Recover Your AIScript Account");

  /**
   * Notification hook to show notifications to the user
   */
  const { open } = useNotification();

  // Check if the user is authenticated
  const { data: auth, isLoading } = useIsAuthenticated();

  /**
   * Mutation for requesting a forgot password token for the specified email.
   * Sends an email to the user with a link to reset their password.
   * @type {RequestForgotPasswordMutation}
   */
  const {
    mutate: requestForgotPassword,
    isLoading: isRequestingForgotPassword,
    data: requestForgotPasswordData,
    isError: isRequestForgotPasswordError,
  } = useCustomMutation<RequestForgotPasswordMutation>();

  /**
   * Handle forgot password form submission
   * @param {FormEvent<HTMLFormElement>} e - Form event
   * @returns {void}
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    // Prevent default form submission
    e.preventDefault();

    // If already requesting forgot password, return
    if (isRequestingForgotPassword) return;

    // Get form data
    const formData = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    );

    // Call request forgot password mutation
    requestForgotPassword({
      url: API_URL,
      method: "post",
      meta: {
        gqlMutation: MUTATION_REQUEST_FORGOT_PASSWORD,
        variables: {
          requestForgotPasswordInput: {
            email: formData.email,
          },
        },
      },
      values: {},
      errorNotification: (data: HttpError | undefined) => {
        return {
          description: "Unable to send you a reset password email",
          message:
            data?.message ||
            "We could not send you a reset password email due to a technical issue on our end. Please try again.",
          type: "error",
          key: "request-forgot-password-error",
        };
      },
    });
  };

  /**
   * Hook to show success notification when forgot password email is successfully sent
   */
  useEffect(() => {
    if (!isRequestForgotPasswordError && requestForgotPasswordData) {
      return open?.({
        description: "Reset password email sent",
        message:
          "We have sent you an email with instructions to reset your password.",
        type: "success",
        key: "request-forgot-password-success",
      });
    }
  }, [isRequestForgotPasswordError, open, requestForgotPasswordData]);

  // If the user is authenticated and the page is not loading, redirect the user to the home page.
  if (auth?.authenticated && !isLoading) {
    return <Navigate to="/home" />;
  }

  return (
    <>
      <Helmet>
        <title>Forgot Password - Recover Your AIScript Account</title>
        <meta
          name="description"
          content="Forgot your AIScript password? Recover your account quickly and securely to continue creating high-quality books with our AI-powered tools."
        />
      </Helmet>

      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="overflow-hidden flex items-center justify-center min-h-screen font-['Poppins']">
          <Gradient />
          <div className="relative flex justify-end flex-col m-6 space-y-8 bg-n-7 shadow-2xl rounded-2xl p-1.5 md:flex-row md:space-y-0 w-[80%] max-w-2xl h-96">
            <div
              className="absolute hidden md:flex w-full h-[95%] left-0 p-6 ml-5"
              style={{
                backgroundImage: `url(${RobotForgotPassword})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundBlendMode: "lighten",
              }}
            ></div>

            <div className="w-full md:w-2/3 z-2 h-full flex flex-col items-center justify-center gap-3 p-6 md:p-0 md:pr-6">
              <div className="w-full">
                <h1 className="text-3xl text-n-1">Forgot your password?</h1>
                <p className="body-2">No worries! Reset your password here.</p>
              </div>

              <Spin
                spinning={isRequestingForgotPassword}
                wrapperClassName="w-full"
              >
                <form
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col gap-3"
                >
                  <div className="flex flex-col w-full">
                    <label htmlFor="email">Email</label>
                    <input
                      className="input bg-n-6 border-2 border-n-6 focus:border-n-3 outline-none transition-all rounded-lg px-3 py-2 text-sm w-full"
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      required
                      disabled={isRequestingForgotPassword}
                    />
                  </div>

                  <Button
                    white
                    type="submit"
                    className="mt-2"
                    disabled={isRequestingForgotPassword}
                  >
                    {isRequestingForgotPassword
                      ? "Resetting Password..."
                      : "Reset Password"}
                  </Button>
                </form>
              </Spin>

              <div className="w-full flex items-center justify-center -mt-2">
                <p className="text-n-1 text-sm">
                  Give it a second thought?{" "}
                  <Link
                    to="/login"
                    className="text-n-3 hover:text-n-1 transition-all underline hover:underline"
                    onClick={
                      isRequestingForgotPassword
                        ? (e: MouseEvent) => e.preventDefault()
                        : undefined
                    }
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
