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
import { Spin } from "antd";
import { Helmet } from "react-helmet-async";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { HttpError, useCustomMutation } from "@refinedev/core";

// GraphQL Mutations
import { MUTATION_LOGIN_TWO_FACTOR_AUTHENTICATION } from "@/graphql/mutations/loginTwoFactorAuthentication";
// GraphQL Types
import { LoginTwoFactorAuthenticationMutation } from "@/graphql/types";
// Providers
import { API_URL } from "@/providers";

// Interfaces
interface Verify2FAPageProps {}

let currentPINIndex: number = 0;

/**
 * Verify2FA Page Component
 *
 * @interface Verify2FAPageProps
 * @returns {JSX.Element} - Verify2FAPage Component
 * @exports Verify2FAPage
 */
export const Verify2FAPage: FC<Verify2FAPageProps> = (): JSX.Element => {
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
   * State to store the loading state of the component
   * @type {boolean}
   * @default false
   */
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * Reference to the input field
   * @type {RefObject<HTMLInputElement>}
   * @default null
   */
  const inputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  /**
   * Navigate function for redirecting to other pages
   * @type {NavigateFunction}
   * @function
   */
  const navigate: NavigateFunction = useNavigate();

  /**
   * Custom mutation hook to login with two-factor authentication
   * @type {useCustomMutation<LoginTwoFactorAuthenticationMutation>}
   * @function
   */
  const {
    mutate: loginTwoFactorAuthentication,
    isLoading: isLoggingIn,
    isError: isLoginError,
    data: loginData,
  } = useCustomMutation<LoginTwoFactorAuthenticationMutation>();

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

  const handleOneTimePassword = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (isLoggingIn) return;

    // Get the 6-digit PIN code
    const pin: string[] = Array.from(
      document.querySelectorAll("input[type='number']")
    ).map((input) => (input as HTMLInputElement).value);
    const code: string = pin.join("").trim();

    // Get the short-lived token from the local storage
    const shortLivedToken: string | null =
      localStorage.getItem("short_lived_token");

    // Call the loginTwoFactorAuthentication mutation
    loginTwoFactorAuthentication({
      url: API_URL,
      method: "post",
      config: {
        headers: {
          // Send the short-lived token in the Authorization header
          Authorization: `Bearer ${shortLivedToken}`,
        },
      },

      meta: {
        gqlMutation: MUTATION_LOGIN_TWO_FACTOR_AUTHENTICATION,
        variables: {
          loginTwoFactorAuthenticationInput: {
            userId: "toVerify",
            otp: code,
          },
        },
      },
      values: {},

      errorNotification: (data: HttpError | undefined) => {
        return {
          description: "Unable to verify your login",
          message:
            data?.message ||
            "An error occurred while verifying your two-factor authentication login. Please try again.",
          type: "error",
        };
      },
    });
  };

  /**
   * Hook to check if the user is permitted to access the page;
   * If the user has not the short-lived token, redirect the user to the login page.
   * If the two-factor authentication validation is successful, provide the user with an access token
   * and redirect the user to the home page.
   */
  useEffect(() => {
    if (!localStorage.getItem("short_lived_token"))
      navigate("/login", { replace: true });
    else if (localStorage.getItem("short_lived_token") && !loginData)
      setIsLoading(false);

    if (!isLoginError && loginData) {
      // Set the access token in the local storage
      localStorage.setItem(
        "access_token",
        loginData.data.loginTwoFactorAuthentication.accessToken
      );
      // Remove the short-lived token from the local storage
      localStorage.removeItem("short_lived_token");
      // Redirect the user to the home page
      navigate("/home", { replace: true });
    }
  }, [isLoginError, loginData, navigate]);

  return (
    <>
      <Helmet>
        <title>
          Verify Two-Factor Authentication - Secure Your AIScript Account
        </title>
        <meta
          name="description"
          content="Verify your two-factor authentication (2FA) to secure your AIScript account. Enhance your security and access advanced AI book creation tools."
        />
      </Helmet>

      <div className="w-screen h-screen flex items-center justify-center">
        {isLoading ? (
          <Spin />
        ) : (
          <form
            onSubmit={handleOneTimePassword}
            className="w-full max-w-full sm:max-w-lg shadow-lg font-['Poppins']"
          >
            <div className="w-full text-n-1/75 px-2 sm:px-6 pt-8 pb-10 sm:pt-5 sm:pb-7 bg-n-7 rounded-none sm:rounded-md border border-n-6/70 flex flex-col gap-2">
              <h2 className="text-xl font-semibold text-n-1/85">
                Enter your code
              </h2>

              <p className="text-n-1/75 text-justify font-['Poppins']">
                Enter the 6-digit security code from your authenticator app.
              </p>

              <div className="flex space-x-2 sm:space-x-3">
                {PIN.map((_, index: number) => (
                  <input
                    key={index}
                    type="number"
                    name={`pin-${index}`}
                    ref={activePINIndex === index ? inputRef : null}
                    className="block w-[32px] sm:w-[38px] aspect-square text-center bg-transparent border border-n-6/70 rounded-md outline-none focus:border-n-4 duration-300 ease-in-out font-light text-sm disabled:opacity-50 disabled:pointer-events-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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

              <button
                type="submit"
                className="mt-4 bg-gradient-to-br from-purple-600 to-blue-500 text-white font-medium text-lg hover:bg-gradient-to-bl px-4 py-2 rounded-md shadow-md cursor-pointer transition-all ease-in-out w-full disabled:opacity-80 disabled:pointer-events-none"
                disabled={isLoggingIn}
              >
                Continue
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};
