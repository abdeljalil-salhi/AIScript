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
import { MUTATION_DISABLE_TWO_FACTOR_AUTHENTICATION } from "@/graphql/mutations/disableTwoFactorAuthentication";
// GraphQL Types
import {
  DisableTwoFactorAuthenticationMutation,
  VerifyPasswordMutation,
} from "@/graphql/types";
import { MeResponse } from "@/graphql/schema.types";
// Providers
import { API_URL } from "@/providers";

// Interfaces
interface Disable2FAModalProps {
  open: boolean;
  onClose: () => void;
}

let currentPINIndex: number = 0;

/**
 * Disable two-factor authentication (2FA) modal Component
 *
 * @interface Disable2FAModalProps
 * @returns {JSX.Element} - Disable2FAModal Component
 * @exports Disable2FAModal
 */
export const Disable2FAModal: FC<Disable2FAModalProps> = ({
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
   * State to store if the 2FA is disabled or not
   * @type {boolean}
   * @default false
   */
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

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
   * Mutation to disable two-factor authentication (2FA) for the user
   * @type {DisableTwoFactorAuthenticationMutation}
   */
  const {
    mutate: disable2FA,
    isLoading: isDisabling2FA,
    error: disable2FAError,
    data: disable2FAData,
  } = useCustomMutation<DisableTwoFactorAuthenticationMutation>();

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
   * Handles the password protection form submission
   * @param {FormEvent<HTMLFormElement>} e - The form event
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
   */
  useEffect(() => {
    if (isIdentityLoading) return;

    if (!isVerifyingPassword && verifyPasswordData && identity) {
      // If the password is correct, move to the next step
      if (verifyPasswordData.data.verifyPassword) setNext(true);
      // If the password is incorrect, show an error notification to the user
      else
        return openNotification?.({
          type: "error",
          description: "Password verification failed",
          message: "The password you entered is incorrect. Please try again.",
        });
    }
  }, [
    identity,
    isIdentityLoading,
    isVerifyingPassword,
    openNotification,
    verifyPasswordData,
  ]);

  /**
   * Handle the submission of the form to disable two-factor authentication
   * @param {FormEvent<HTMLFormElement>} e - The form event
   * @returns {void}
   */
  const handleDisable2FA = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (isDisabling2FA || isIdentityLoading || isDisabled) return;

    const pin: string[] = Array.from(
      document.querySelectorAll("input[type='number']")
    ).map((input) => (input as HTMLInputElement).value);
    const code: string = pin.join("").trim();

    // Disable two-factor authentication for the user
    disable2FA({
      url: API_URL,
      method: "post",
      meta: {
        gqlMutation: MUTATION_DISABLE_TWO_FACTOR_AUTHENTICATION,
        variables: {
          userId: identity!.user.id,
          otp: code,
        },
      },
      values: {},
      errorNotification: (data: HttpError | undefined) => {
        return {
          description: "Unable to disable two-factor authentication",
          message:
            data?.message ||
            "An error occurred while disabling two-factor authentication. Please try again.",
          type: "error",
        };
      },
    });
  };

  /**
   * Hook to show a success notification to the user when 2FA is successfully disabled
   */
  useEffect(() => {
    if (!disable2FAError && disable2FAData && !isDisabled) {
      // Show a success notification to the user
      openNotification?.({
        type: "success",
        description: "Success!",
        message: "Two-factor authentication has been successfully disabled.",
      });

      // Set the 2FA disabled state to true
      setIsDisabled(true);

      // Refetch the user's identity
      refetchIdentity();

      // Close the modal
      onClose();
    }
  }, [disable2FAData, disable2FAError, isDisabled, onClose, openNotification, refetchIdentity]);

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
                Two-factor authentication (2FA) adds an extra layer of security
                to your account. If you are sure you want to disable it, please
                enter your password below.
              </p>
              <input
                type="password"
                name="password"
                placeholder="Enter your account password"
                className="w-full placeholder-n-10 text-n-3 max-w-96 lg:max-w-full p-2 bg-transparent border border-n-6/70 rounded-md outline-none focus:border-n-4 duration-300 ease-in-out font-light"
                required
              />
              <button
                type="submit"
                className="mt-2 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl px-4 py-2 rounded-md shadow-md cursor-pointer transition-all ease-in-out w-full mx-4"
              >
                Disable 2FA
              </button>
            </form>
          ) : (
            <form
              onSubmit={handleDisable2FA}
              className="p-4 pb-0 w-full flex flex-col gap-3 items-center justify-center"
            >
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
