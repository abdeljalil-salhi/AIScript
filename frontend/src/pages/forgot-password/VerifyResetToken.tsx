// Dependencies
import { FC, FormEvent, useEffect, useState } from "react";
import { Spin } from "antd";
import { validate } from "uuid";
import {
  Navigate,
  NavigateFunction,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  HttpError,
  useCustomMutation,
  useIsAuthenticated,
  useNotification,
} from "@refinedev/core";

// Assets
import { RobotForgotPassword } from "@/assets/forgot-password";
// Components
import { Button } from "@/components/landing/Button";
import { Gradient } from "@/components/landing/Gradient";
// Pages
import { LoadingPage } from "../loading";
// GraphQL Mutations
import { MUTATION_FORGOT_PASSWORD } from "@/graphql/mutations/forgotPassword";
// GraphQL Types
import { ForgotPasswordMutation } from "@/graphql/types";
// Providers
import { API_URL } from "@/providers";
import { Helmet } from "react-helmet-async";

// Interfaces
interface VerifyResetTokenProps {}
interface VerifyResetTokenParams {
  // Token from the URL
  token: string;
  // Allow for other params
  [key: string]: string | undefined;
}
interface FormInput {
  id: string;
  type: string;
  placeholder: string;
}

/**
 * Verify Reset Token Component
 *
 * @interface VerifyResetTokenProps
 * @returns {JSX.Element} - VerifyResetToken Component
 * @exports VerifyResetToken
 */
export const VerifyResetToken: FC<VerifyResetTokenProps> = (): JSX.Element => {
  /**
   * State to check if the token has been validated
   * @type {boolean}
   * @default false
   */
  const [isTokenValidated, setIsTokenValidated] = useState<boolean>(false);

  /**
   * Notification hook to show notifications to the user
   */
  const { open } = useNotification();

  /**
   * Navigate function for redirecting to other pages
   */
  const navigate: NavigateFunction = useNavigate();

  /**
   * Get the token from the URL
   */
  const { token }: Readonly<Partial<VerifyResetTokenParams>> =
    useParams<VerifyResetTokenParams>();

  // Check if the user is authenticated
  const { data: auth, isLoading } = useIsAuthenticated();

  /**
   * Mutation to verify the forgot password token and update the user password
   * @type {ForgotPasswordMutation}
   */
  const {
    mutate: forgotPassword,
    isLoading: isForgotPassword,
    isError: isForgotPasswordError,
    data: forgotPasswordData,
  } = useCustomMutation<ForgotPasswordMutation>();

  /**
   * Handle forgot password form submission
   * @param {FormEvent<HTMLFormElement>} e - Form event
   * @returns {void}
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    // Prevent default form submission
    e.preventDefault();

    // If already verifying forgot password, return
    if (isForgotPassword) return;

    // Get form data
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Call forgot password mutation
    forgotPassword({
      url: API_URL,
      method: "post",
      meta: {
        gqlMutation: MUTATION_FORGOT_PASSWORD,
        variables: {
          verifyForgotPasswordInput: {
            token,
            email,
            password,
            confirmPassword,
          },
        },
      },
      values: {},
      errorNotification: (data: HttpError | undefined) => {
        return {
          description: "Unable to reset your password",
          message:
            data?.message ||
            "An error occurred while resetting your password due to a technical issue on our end. Please try again.",
          type: "error",
          key: "forgot-password-error",
        };
      },
    });
  };

  /**
   * Hook to show success notification and redirect to login page when password is successfully reset
   */
  useEffect(() => {
    if (!isTokenValidated && token) {
      // Validate the token
      if (validate(token)) {
        setIsTokenValidated(true);
      } else {
        // Show error notification
        open?.({
          description: "Invalid token",
          message: "The reset link is invalid. Please try again.",
          type: "error",
          key: "invalid-token",
        });

        // Redirect to forgot password page
        navigate("/forgot-password");
      }
    }

    if (!isForgotPasswordError && forgotPasswordData) {
      // Show success notification
      open?.({
        description: "Successfully reset password",
        message:
          "Your password has been successfully reset. You can now login.",
        type: "success",
        key: "forgot-password-success",
      });

      // Redirect to login page
      navigate("/login");
    }
  }, [
    forgotPasswordData,
    isForgotPasswordError,
    isLoading,
    isTokenValidated,
    navigate,
    open,
    token,
  ]);

  // If the user is authenticated and the page is not loading, redirect the user to the home page.
  if (auth?.authenticated && !isLoading) {
    return <Navigate to="/home" />;
  }

  return (
    <>
      <Helmet>
        <title>Verify and Change Password - Secure Your AIScript Account</title>
        <meta
          name="description"
          content="Verify your reset token and change your password to secure your AIScript account. Take control of your account security and continue creating high-quality books with confidence."
        />
      </Helmet>

      {!isTokenValidated || isLoading ? (
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
                <h1 className="text-3xl text-n-1">Change your password</h1>
                <p className="body-2">
                  Enter your new password to reset your account.
                </p>
              </div>

              <Spin spinning={isForgotPassword} wrapperClassName="w-full">
                <form
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col gap-3"
                >
                  {formInputs.map((input: FormInput) => (
                    <div className="flex flex-col w-full">
                      <input
                        className="input bg-n-6 border-2 border-n-6 focus:border-n-3 outline-none transition-all rounded-lg px-3 py-2 text-sm w-full"
                        id={input.id}
                        type={input.type}
                        name={input.id}
                        placeholder={input.placeholder}
                        required
                        disabled={isForgotPassword}
                      />
                    </div>
                  ))}

                  <Button
                    white
                    type="submit"
                    className="mt-2"
                    disabled={isForgotPassword}
                  >
                    {isForgotPassword
                      ? "Resetting Password..."
                      : "Reset Password"}
                  </Button>
                </form>
              </Spin>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const formInputs: FormInput[] = [
  {
    id: "email",
    type: "email",
    placeholder: "Confirm your email address",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Enter your new password",
  },
  {
    id: "confirmPassword",
    type: "password",
    placeholder: "Confirm your new password",
  },
];
