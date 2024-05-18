// Dependencies
import { FC, useEffect } from "react";
import { Spin } from "antd";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { useCustomMutation, useGetIdentity } from "@refinedev/core";

// GraphQL Types
import { VerifyEmailMutation } from "@/graphql/types";
import { API_URL } from "@/providers";
import { MUTATION_VERIFY_EMAIL } from "@/graphql/mutations/verifyEmail";
import { MeResponse } from "@/graphql/schema.types";

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
    error: verifyEmailError,
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

    try {
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
      });

      if (!isVerifyingEmail && !verifyEmailError)
        window.location.href = "/profile";
    } catch (error) {
      navigate("/404");
    }
  }, [
    identity,
    isIdentityLoading,
    isVerifyingEmail,
    navigate,
    token,
    verifyEmail,
    verifyEmailError,
  ]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Spin />
    </div>
  );
};
