// Dependencies
import {
  ChangeEvent,
  FC,
  FormEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import {
  HttpError,
  useCustomMutation,
  useGetIdentity,
  useNotification,
} from "@refinedev/core";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

// Types
import { MeResponse } from "@/graphql/schema.types";
// Components
import { ChangePasswordModal } from "@/components/profile/ChangePasswordModal";
import { Enable2FAModal } from "@/components/profile/Enable2FAModal";
import { VerifyEmailModal } from "@/components/profile/VerifyEmailModal";
import { SubscriptionCard } from "@/components/profile/SubscriptionCard";
// GraphQL Mutations
import { MUTATION_UPDATE_USER } from "@/graphql/mutations/updateUser";
import { MUTATION_REQUEST_EMAIL_VERIFICATION } from "@/graphql/mutations/requestEmailVerification";
// GraphQL Types
import {
  RequestEmailVerificationMutation,
  UpdateUserMutation,
} from "@/graphql/types";
// Providers
import { API_URL } from "@/providers";
import { Disable2FAModal } from "@/components/profile/Disable2FAModal";

// Interfaces
interface SettingsFormProps {}

/**
 * SettingsForm Component
 *
 * @interface SettingsFormProps
 * @returns {JSX.Element} - SettingsForm Component
 * @exports SettingsForm
 */
export const SettingsForm: FC<SettingsFormProps> = (): JSX.Element => {
  /**
   * States to toggle the modals
   * @type {boolean}
   * @default false
   */
  const [showChangePasswordModal, setShowChangePasswordModal] =
    useState<boolean>(false);
  const [showVerifyEmailModal, setShowVerifyEmailModal] =
    useState<boolean>(false);
  const [showEnable2FAModal, setShowEnable2FAModal] = useState<boolean>(false);
  const [showDisable2FAModal, setShowDisable2FAModal] =
    useState<boolean>(false);

  /**
   * States to store input values
   * @type {string}
   */
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  /**
   * Notification hook to show notifications to the user
   */
  const { open } = useNotification();

  /**
   * Mutation to update the user's information
   * @type {UpdateUserMutation}
   */
  const {
    mutate: updateUser,
    isLoading: isUpdatingUser,
    isError: isUpdateUserError,
    data: updateUserData,
  } = useCustomMutation<UpdateUserMutation>();

  /**
   * Mutation to request an email verification
   * @type {RequestEmailVerificationMutation}
   */
  const {
    mutate: requestEmailVerification,
    isLoading: isRequestingEmailVerification,
  } = useCustomMutation<RequestEmailVerificationMutation>();

  /**
   * Get the user's identity
   * @type {MeResponse}
   */
  const {
    data: identity,
    isLoading: isIdentityLoading,
    refetch: refetchIdentity,
  } = useGetIdentity<MeResponse>();

  /**
   * Set the username and email when the identity is loaded
   * @returns {void}
   * @sideeffects {setUsername, setEmail}
   */
  useEffect(() => {
    if (identity) {
      setUsername(identity.user.username);
      setEmail(identity.user.connection!.email);
    }
  }, [identity]);

  /**
   * Handle the form submission to update the user's information
   * @param {FormEvent<HTMLFormElement>} e - Event
   * @returns {void}
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (isUpdatingUser || isIdentityLoading) return;

    if (!username || username.trim().length < 4 || username.trim().length > 20)
      return open?.({
        type: "error",
        description: "Unable to update your profile",
        message:
          "Your username does not meet the requirements. It must be 4 - 20 characters long.",
      });

    if (!email || email.trim().length < 6 || email.trim().length > 50)
      return open?.({
        type: "error",
        description: "Unable to update your profile",
        message:
          "Your email address does not meet the requirements. It must be 6 - 50 characters long.",
      });

    if (
      email === identity?.user.connection?.email &&
      username === identity?.user.username
    )
      return open?.({
        type: "error",
        description: "Hmmm?",
        message: "You haven't made any changes to your profile.",
      });

    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))
      return open?.({
        type: "error",
        description: "Unable to update your profile",
        message:
          "Your email address does not meet the requirements. Please enter a valid email address.",
      });

    let updatedUsername: string | null = username;
    let updatedEmail: string | null = email;

    if (username === identity?.user.username) updatedUsername = null;
    if (
      email === identity?.user.connection?.email ||
      identity?.user.connection?.provider !== "local"
    )
      updatedEmail = null;

    updateUser({
      url: API_URL,
      method: "post",
      meta: {
        gqlMutation: MUTATION_UPDATE_USER,
        variables: {
          updateUserInput: {
            userId: identity!.user.id,
            username: username.trim().length > 3 ? updatedUsername : undefined,
            email: email.trim().length > 5 ? updatedEmail : undefined,
          },
        },
      },
      values: {},
      errorNotification: (data: HttpError | undefined) => {
        return {
          description: "Unable to update your profile",
          message:
            data?.message ||
            "Your changes were saved, but we could not update your profile due to a technical issue on our end. Please try again.",
          type: "error",
        };
      },
    });
  };

  useEffect(() => {
    if (!isUpdateUserError && updateUserData) {
      // Refetch the identity to get the updated user information
      refetchIdentity();

      // Show a success notification
      open?.({
        type: "success",
        description: "Success!",
        message: "Your profile has been updated successfully.",
      });
    }
  }, [isUpdateUserError, open, refetchIdentity, updateUserData]);

  const handleEmailVerification = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isRequestingEmailVerification || isIdentityLoading) return;

    requestEmailVerification({
      url: API_URL,
      method: "post",
      meta: {
        gqlMutation: MUTATION_REQUEST_EMAIL_VERIFICATION,
        variables: {
          requestEmailVerificationInput: {
            userId: identity!.user.id,
            connectionId: identity!.user.connection!.id,
            email: identity!.user.connection!.email,
          },
        },
      },
      values: {},
      errorNotification: () => {
        return {
          description: "Unable to send you a verification email",
          message:
            "We could not send you a verification email due to a technical issue on our end. Please try again.",
          type: "error",
        };
      },
    });

    setShowVerifyEmailModal(true);
  };

  return (
    <>
      <form
        className="w-full max-w-96 lg:max-w-2xl flex flex-col gap-3 font-['Poppins']"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="w-full max-w-96 lg:max-w-full p-2 bg-transparent border border-n-6/70 rounded-md outline-none focus:border-n-4 duration-300 ease-in-out font-light"
            placeholder="e.g. johndoe"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            maxLength={20}
          />
        </div>

        <div className="w-full flex flex-col gap-1">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            className="w-full max-w-96 lg:max-w-full p-2 bg-transparent border border-n-6/70 rounded-md outline-none focus:border-n-4 duration-300 ease-in-out font-light disabled:bg-n-6/70"
            placeholder="Your email address"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            maxLength={50}
            disabled={identity?.user.connection?.provider !== "local"}
          />
          {!isIdentityLoading ? (
            identity?.user.connection?.isEmailVerified ? (
              <div className="flex flex-row gap-1 items-center justify-start">
                <CheckCircleOutlined className="text-green-600 text-xs" />
                <p className="text-green-600 text-xs font-light italic">
                  Your email address is verified
                </p>
              </div>
            ) : (
              <div className="flex flex-row gap-1 items-center justify-start">
                <CloseCircleOutlined className="text-red-600/80 text-xs" />
                <p className="text-red-600/80 text-xs font-light italic">
                  Your email address is not verified
                </p>
              </div>
            )
          ) : (
            <div className="flex flex-row gap-1 items-center justify-start">
              <InfoCircleOutlined className="text-n-4 text-xs" />
              <p className="text-n-4 text-xs font-light italic">
                Fetching email verification status...
              </p>
            </div>
          )}
        </div>

        <input
          type="submit"
          value="Save"
          className="w-full max-w-96 lg:max-w-full px-4 py-2 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-md shadow-md cursor-pointer transition-all ease-in-out"
        />
      </form>

      <hr className="hidden md:block w-full max-w-96 lg:max-w-2xl my-3 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-n-5 to-transparent opacity-50" />

      <SubscriptionCard
        identity={identity}
        isIdentityLoading={isIdentityLoading}
      />

      <hr className="hidden md:block w-full max-w-96 lg:max-w-2xl my-3 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-n-5 to-transparent opacity-50" />

      <div className="w-full max-w-96 lg:max-w-2xl flex flex-col gap-2">
        {!isIdentityLoading && !identity?.user.connection?.isEmailVerified && (
          <>
            <button
              className="w-full max-w-full px-4 py-2 text-center bg-n-6 hover:bg-n-6/70 text-n-1 rounded-md shadow-md cursor-pointer transition-all ease-in-out"
              onClick={handleEmailVerification}
            >
              Verify your email address
            </button>
            <VerifyEmailModal
              email={identity!.user.connection!.email}
              open={showVerifyEmailModal}
              onClose={() => setShowVerifyEmailModal(false)}
            />
          </>
        )}

        {identity?.user.connection?.provider === "local" && (
          <>
            <button
              className="w-full max-w-full px-4 py-2 text-center bg-n-6 hover:bg-n-6/70 text-n-1 rounded-md shadow-md cursor-pointer transition-all ease-in-out"
              onClick={() => setShowChangePasswordModal(true)}
            >
              Change your password
            </button>
            <ChangePasswordModal
              identity={identity!}
              open={showChangePasswordModal}
              onClose={() => setShowChangePasswordModal(false)}
            />
          </>
        )}

        {!isIdentityLoading ? (
          !identity?.user.connection?.is2faEnabled ? (
            <>
              <button
                className="w-full max-w-full px-4 py-2 text-center bg-n-6 hover:bg-n-6/70 text-n-1 rounded-md shadow-md cursor-pointer transition-all ease-in-out"
                onClick={() => setShowEnable2FAModal(true)}
              >
                Enable two-factor authentication
              </button>
              <Enable2FAModal
                open={showEnable2FAModal}
                onClose={() => setShowEnable2FAModal(false)}
              />
            </>
          ) : (
            <>
              <button
                className="w-full max-w-full px-4 py-2 text-center bg-n-6 hover:bg-n-6/70 text-n-1 rounded-md shadow-md cursor-pointer transition-all ease-in-out"
                onClick={() => setShowDisable2FAModal(true)}
              >
                Disable two-factor authentication
              </button>
              <Disable2FAModal
                open={showDisable2FAModal}
                onClose={() => setShowDisable2FAModal(false)}
              />
            </>
          )
        ) : null}

        <div className="w-full max-w-full text-start text-n-4 text-xs font-light italic">
          <p>
            Joined on{" "}
            {!isIdentityLoading &&
              new Date(identity!.user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
          </p>
        </div>
      </div>
    </>
  );
};
