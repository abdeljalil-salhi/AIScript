// Dependencies
import { FC, useEffect, useState } from "react";
import { Spin } from "antd";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { HttpError, useCustomMutation, useGetIdentity } from "@refinedev/core";

// Assets
import MailError from "@/assets/verify-email/mail-error.svg";
// GraphQL Mutations
import { MUTATION_VERIFY_EMAIL } from "@/graphql/mutations/verifyEmail";
// GraphQL Types
import { VerifyEmailMutation } from "@/graphql/types";
import { MeResponse } from "@/graphql/schema.types";
// Providers
import { API_URL } from "@/providers";

// Interfaces
interface VerifyEmailPageProps {}

interface VerifyEmailPageParams {
  // Token from the URL
  token: string;
  // Allow for other params
  [key: string]: string | undefined;
}

/**
 * Verify Email Page Component
 *
 * @interface VerifyEmailPageProps
 * @returns {JSX.Element} - Verify Email Page Component
 * @exports VerifyEmailPage
 */
export const VerifyEmailPage: FC<VerifyEmailPageProps> = (): JSX.Element => {
  /**
   * State to check if the verification request has been sent
   * @type {boolean}
   * @default false
   */
  const [isSent, setIsSent] = useState<boolean>(false);
  /**
   * State for the timer
   * @type {number}
   * @default 5
   */
  const [timer, setTimer] = useState<number>(5);

  /**
   * Navigate function for redirecting to other pages
   */
  const navigate: NavigateFunction = useNavigate();

  /**
   * Get the token from the URL
   */
  const { token }: Readonly<Partial<VerifyEmailPageParams>> =
    useParams<VerifyEmailPageParams>();

  /**
   * Mutation to verify email
   * @type {VerifyEmailMutation}
   */
  const {
    mutate: verifyEmail,
    isLoading: isVerifyingEmail,
    isError: isVerifyEmailError,
    error: verifyEmailError,
    data: verifyEmailData,
  } = useCustomMutation<VerifyEmailMutation>();

  /**
   * Get the user's identity
   * @type {MeResponse}
   */
  const { data: identity, isLoading: isIdentityLoading } =
    useGetIdentity<MeResponse>();

  useEffect(() => {
    if (!isIdentityLoading && !identity) navigate("/login");

    if (isIdentityLoading) return;

    if (identity?.user.connection?.isEmailVerified)
      window.location.href = "/profile";

    if (!isSent) {
      verifyEmail({
        url: API_URL,
        method: "post",
        meta: {
          gqlMutation: MUTATION_VERIFY_EMAIL,
          variables: {
            token,
          },
        },
        values: {},
        errorNotification: (data: HttpError | undefined) => {
          return {
            description: "Unable to verify your email",
            message:
              data?.message ||
              "An error occurred while verifying your email. Please try again.",
            type: "error",
          };
        },
      });
      setIsSent(true);
    }
  }, [
    identity,
    isIdentityLoading,
    isSent,
    isVerifyingEmail,
    navigate,
    token,
    verifyEmail,
    verifyEmailError,
  ]);

  useEffect(() => {
    if (isVerifyingEmail) return;

    if (!isVerifyEmailError && !verifyEmailError && verifyEmailData)
      window.location.href = "/profile";

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    if (timer === 0) {
      clearInterval(interval);
      window.location.href = "/profile";
    }

    return () => clearInterval(interval);
  }, [
    isVerifyEmailError,
    isVerifyingEmail,
    navigate,
    timer,
    verifyEmailData,
    verifyEmailError,
  ]);

  return !isVerifyEmailError ? (
    <div className="w-screen h-screen flex items-center justify-center">
      <Spin />
    </div>
  ) : (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-4">
      <img
        src={MailError}
        className="w-[80%] md:w-1/2 h-1/2"
        alt="An error occurred while verifying your email."
        draggable={false}
      />
      <div className="flex flex-col items-center justify-center font-['Poppins']">
        <h1 className="text-lg md:text-2xl font-bold text-n-2 text-center">
          An error occurred while verifying your email.
        </h1>
        <p className="text-sm md:text-base text-n-2">
          {verifyEmailError?.message ||
            "An error occurred while verifying your email. Please try again."}
        </p>
        <p className="text-xs text-gray-500 mt-3">
          Redirecting you to the profile page in {timer} second
          {timer > 1 ? "s" : ""}...
        </p>

        <button
          className="text-xs text-gray-500 underline mt-3"
          onClick={() => navigate("/profile")}
        >
          Click here if you are not redirected
        </button>
      </div>
    </div>
  );
};
