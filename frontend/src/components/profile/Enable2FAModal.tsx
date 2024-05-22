// Dependencies
import {
  ChangeEvent,
  FC,
  FormEvent,
  KeyboardEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  HttpError,
  useCustomMutation,
  useGetIdentity,
  useNotification,
} from "@refinedev/core";

// Components
import { Backdrop } from "../Backdrop";
// GraphQL Mutations
import { MUTATION_VERIFY_PASSWORD } from "@/graphql/mutations/verifyPassword";
import { MUTATION_GENERATE_TWO_FACTOR_AUTHENTICATION_SECRET } from "@/graphql/mutations/generateTwoFactorAuthenticationSecret";
import { MUTATION_ENABLE_TWO_FACTOR_AUTHENTICATION } from "@/graphql/mutations/enableTwoFactorAuthentication";
// GraphQL Types
import {
  EnableTwoFactorAuthenticationMutation,
  GenerateTwoFactorAuthenticationSecretMutation,
  VerifyPasswordMutation,
} from "@/graphql/types";
import { MeResponse } from "@/graphql/schema.types";
// Providers
import { API_URL } from "@/providers";

// Interfaces
interface Enable2FAModalProps {
  open: boolean;
  onClose: () => void;
}

let currentPINIndex: number = 0;

/**
 * Enable 2FA Modal Component
 *
 * @interface Enable2FAModalProps
 * @returns {JSX.Element} - Enable 2FA Modal Component
 * @exports Enable2FAModal
 */
export const Enable2FAModal: FC<Enable2FAModalProps> = ({
  open,
  onClose,
}): JSX.Element => {
  /**
   * State to store the user's input 6-digit PIN code
   * @type {Array<string>}
   * @default ["","","","","",""]
   */
  const [PIN, setPIN] = useState<Array<string>>(new Array(6).fill(""));
  /**
   * State to store the index of the active input field
   * @type {number}
   * @default 0
   */
  const [activePINIndex, setActivePINIndex] = useState<number>(0);
  /**
   * State to store if the mutation is sent to the server or not
   * @type {boolean}
   * @default false
   */
  const [isMutationSent, setIsMutationSent] = useState<boolean>(false);
  /**
   * State to store if the 2FA is enabled or not
   * @type {boolean}
   * @default false
   */
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  /**
   * State to determine if the user is ready to move to the next step
   * after entering the password
   * @type {boolean}
   * @default false
   */
  const [next, setNext] = useState<boolean>(false);

  /**
   * Reference to the input field
   * @type {RefObject<HTMLInputElement>}
   * @default null
   */
  const inputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  /**
   * Notification hook to show notifications to the user
   */
  const { open: openNotification } = useNotification();

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
   * Mutation to verify the user's password
   * @type {VerifyPasswordMutation}
   */
  const {
    mutate: verifyPassword,
    isLoading: isVerifyingPassword,
    data: verifyPasswordData,
  } = useCustomMutation<VerifyPasswordMutation>();

  /**
   * Mutation to generate a two-factor authentication secret
   * @type {GenerateTwoFactorAuthenticationSecretMutation}
   */
  const {
    mutate: generate2FASecret,
    isLoading: isGenerating2FASecret,
    data: generate2FASecretData,
  } = useCustomMutation<GenerateTwoFactorAuthenticationSecretMutation>();

  /**
   * Mutation to enable two-factor authentication (2FA) for the user
   * @type {EnableTwoFactorAuthenticationMutation}
   */
  const {
    mutate: enable2FA,
    isLoading: isEnabling2FA,
    error: enable2FAError,
    data: enable2FAData,
  } = useCustomMutation<EnableTwoFactorAuthenticationMutation>();

  /**
   * Handle the change event of the input field to update the PIN
   * @param {ChangeEvent<HTMLInputElement>} e - Change Event
   * @returns {void}
   */
  const handleOnChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    // Destructure the value from the target
    const { value } = target;
    const newPIN: string[] = [...PIN];

    // Update the temporary PIN code with the new value
    newPIN[currentPINIndex] = value.substring(value.length - 1);

    // If the value is empty, move to the previous input field
    if (!value) setActivePINIndex(currentPINIndex - 1);
    // If the value is not empty and the current index is less than 5, move to the next input field
    else setActivePINIndex(currentPINIndex + 1);

    // Set the temporary PIN code to the PIN state
    setPIN(newPIN);
  };

  /**
   * Handle the key down event of the input field to move to the previous input field
   * when the backspace key is pressed
   * @param {KeyboardEvent<HTMLInputElement>} e - Keyboard Event
   * @param {number} index - Index of the input field
   * @returns {void}
   */
  const handleOnKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    currentPINIndex = index;
    if (e.key === "Backspace") setActivePINIndex(currentPINIndex - 1);
  };

  /**
   * UseEffect Hook to focus on the active input field when the component mounts
   * or the activePINIndex changes (when the user enters a value in the input field)
   */
  useEffect(() => {
    inputRef.current?.focus();
  }, [activePINIndex]);

  /**
   * Handle the password protection form submission
   * @param {FormEvent<HTMLFormElement>} e - Form Event
   * @returns {void}
   */
  const handlePasswordProtection = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (isVerifyingPassword) return;

    // Get the form data
    const formData: FormData = new FormData(e.currentTarget);
    const password: string = formData.get("password")?.toString() || "";

    // Verify the user's password
    verifyPassword({
      url: API_URL,
      method: "post",
      meta: {
        gqlMutation: MUTATION_VERIFY_PASSWORD,
        variables: {
          password,
        },
      },
      values: {},
      errorNotification: (data: HttpError | undefined) => {
        return {
          description: "Password verification failed",
          message:
            data?.message ||
            "An error occurred while verifying your password. Please try again.",
          type: "error",
        };
      },
    });
  };

  /**
   * Hook to handle the verification of the user's password
   * and the generation of the two-factor authentication secret
   */
  useEffect(() => {
    if (isIdentityLoading) return;

    if (
      !isVerifyingPassword &&
      verifyPasswordData &&
      !isMutationSent &&
      identity
    ) {
      // If the password is correct, generate the 2FA secret
      if (verifyPasswordData.data.verifyPassword) {
        generate2FASecret({
          url: API_URL,
          method: "post",
          meta: {
            gqlMutation: MUTATION_GENERATE_TWO_FACTOR_AUTHENTICATION_SECRET,
            variables: {
              userId: identity.user.id,
              username: identity.user.username,
            },
          },
          values: {},
          errorNotification: (data: HttpError | undefined) => {
            return {
              description: "Unable to enable two-factor authentication",
              message:
                data?.message ||
                "An error occurred while enabling two-factor authentication. Please try again.",
              type: "error",
            };
          },
        });

        // Set the mutation sent state to true to prevent multiple requests
        setIsMutationSent(true);
      }
      // If the password is incorrect, show an error notification to the user
      else
        return openNotification?.({
          type: "error",
          description: "Unable to verify password",
          message: "The password you entered is incorrect. Please try again.",
        });
    }

    // If the 2FA secret is generated and the mutation is sent, move to the next step
    if (!isGenerating2FASecret && generate2FASecretData && isMutationSent)
      setNext(true);
  }, [
    generate2FASecret,
    generate2FASecretData,
    identity,
    isGenerating2FASecret,
    isIdentityLoading,
    isMutationSent,
    isVerifyingPassword,
    openNotification,
    verifyPasswordData,
  ]);

  /**
   * Handle the two-factor authentication form submission
   * @param {FormEvent<HTMLFormElement>} e - Form Event
   * @returns {void}
   */
  const handle2FA = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (isEnabling2FA || isIdentityLoading || isEnabled) return;

    const pin: string[] = Array.from(
      document.querySelectorAll("input[type='number']")
    ).map((input) => (input as HTMLInputElement).value);
    const code: string = pin.join("").trim();

    // Enable two-factor authentication for the user
    enable2FA({
      url: API_URL,
      method: "post",
      meta: {
        gqlMutation: MUTATION_ENABLE_TWO_FACTOR_AUTHENTICATION,
        variables: {
          userId: identity!.user.id,
          otp: code,
        },
      },
      values: {},
      errorNotification: (data: HttpError | undefined) => {
        return {
          description: "Unable to enable two-factor authentication",
          message:
            data?.message ||
            "An error occurred while enabling two-factor authentication. Please try again.",
          type: "error",
        };
      },
    });
  };

  /**
   * Hook to show a success notification to the user when 2FA is successfully enabled
   */
  useEffect(() => {
    if (!enable2FAError && enable2FAData && !isEnabled) {
      // Show a success notification to the user
      openNotification?.({
        type: "success",
        description: "Success!",
        message: "Two-factor authentication has been successfully enabled.",
      });

      // Set the 2FA enabled state to true
      setIsEnabled(true);

      // Refetch the user's identity
      refetchIdentity();

      // Close the modal
      onClose();
    }
  }, [enable2FAData, enable2FAError, isEnabled, onClose, openNotification, refetchIdentity]);

  // If the modal is not open, return an empty fragment
  if (!open) return <></>;

  return createPortal(
    <>
      <Backdrop onClick={onClose} dark />
      <div className="z-[11] absolute bg-n-7 m-auto left-0 right-0 top-0 bottom-0 w-11/12 sm:w-fit h-fit rounded-lg">
        <div className="rounded-lg w-full sm:w-96 lg:w-[36rem] xl:w-[42rem] m-auto py-4">
          <h1 className="text-xl font-bold w-full border-b text-center border-n-5 pb-3 text-n-1/85">
            Two-Factor Authentication
          </h1>
          {!next ? (
            <form
              onSubmit={handlePasswordProtection}
              className="mt-2 p-4 pb-0 w-full flex flex-col gap-2 items-center justify-center"
            >
              <p className="w-full text-n-1/75 text-justify">
                Two-factor authentication adds an extra layer of security to
                your account.
              </p>
              {!identity?.user.connection?.isEmailVerified ? (
                <p className="w-full text-sm text-red-700 text-justify">
                  Please verify your email address to enable two-factor
                  authentication.
                </p>
              ) : (
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your account password"
                  className="w-full placeholder-n-10 text-n-3 max-w-96 lg:max-w-full p-2 bg-transparent border border-n-6/70 rounded-md outline-none focus:border-n-4 duration-300 ease-in-out font-light"
                  required
                />
              )}
              <button
                type="submit"
                className="mt-2 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl px-4 py-2 rounded-md shadow-md cursor-pointer transition-all ease-in-out w-full mx-4 disabled:opacity-80 disabled:pointer-events-none"
                disabled={!identity?.user.connection?.isEmailVerified}
              >
                Enable 2FA
              </button>
            </form>
          ) : (
            <form
              onSubmit={handle2FA}
              className="p-4 pb-0 w-full flex flex-col gap-3 items-center justify-center"
            >
              <div className="w-full text-n-1/75 px-2 py-2 bg-n-7 rounded-md border border-n-6/70 flex flex-row gap-3">
                <div className="w-4/6 flex flex-col">
                  <h2 className="text-lg font-bold text-n-1/85">
                    Download Google Authenticator
                  </h2>
                  <p className="text-n-1/75 text-justify font-['Poppins']">
                    Download and install{" "}
                    <a
                      href="https://support.google.com/accounts/answer/1066447?hl=en"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Google Authenticator
                    </a>{" "}
                    on your phone or tablet.
                  </p>
                </div>
                <div className="w-2/6 flex items-center justify-center">
                  <img
                    src="/assets/google-authenticator.png"
                    className="w-2/6 aspect-square m-auto object-cover rounded-lg brightness-[.7] hover:brightness-100 transition-all ease-in-out duration-300"
                    alt="Google Authenticator logo"
                    draggable={false}
                  />
                </div>
              </div>

              <div className="w-full text-n-1/75 px-2 py-2 bg-n-7 rounded-md border border-n-6/70 flex flex-row gap-3">
                <div className="w-4/6 flex flex-col">
                  <h2 className="text-lg font-bold text-n-1/85">
                    Scan the QR Code
                  </h2>
                  <p className="text-n-1/75 text-justify font-['Poppins']">
                    Open the authentication app and scan the image to the left
                    using your device&apos;s camera.
                  </p>
                </div>
                <div className="w-2/6 flex items-center justify-center">
                  <img
                    src={
                      generate2FASecretData?.data
                        .generateTwoFactorAuthenticationSecret.otpAuthUri || ""
                    }
                    className="w-3/5 aspect-square object-cover brightness-75 hover:brightness-100 transition-all ease-in-out duration-300"
                    alt="QR Code"
                    draggable={false}
                  />
                </div>
              </div>

              <div className="w-full text-n-1/75 px-2 py-2 bg-n-7 rounded-md border border-n-6/70 flex flex-col gap-1">
                <h2 className="text-lg font-bold text-n-1/85">
                  Provide verification code
                </h2>
                <p className="text-n-1/75 text-justify font-['Poppins']">
                  Enter the 6-digit verification code generated.
                </p>
                <div className="flex space-x-3">
                  {PIN.map((_, index: number) => (
                    <input
                      key={index}
                      type="number"
                      name={`pin-${index}`}
                      ref={activePINIndex === index ? inputRef : null}
                      className="block w-[38px] aspect-square text-center bg-transparent border border-n-6/70 rounded-md outline-none focus:border-n-4 duration-300 ease-in-out font-light text-sm disabled:opacity-50 disabled:pointer-events-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      onChange={handleOnChange}
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                        handleOnKeyDown(e, index)
                      }
                      value={PIN[index]}
                      maxLength={1}
                      required
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl px-4 py-2 rounded-md shadow-md cursor-pointer transition-all ease-in-out w-full mx-4"
              >
                Done
              </button>
            </form>
          )}
        </div>
      </div>
    </>,
    document.getElementById("portal") as HTMLDivElement
  );
};
