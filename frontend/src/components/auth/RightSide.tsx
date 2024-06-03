// Dependencies
import { FC, FormEvent, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import { useRegister } from "@refinedev/core";

// Assets
import { AIScriptLogo } from "@/assets";
import { Background } from "@/assets/auth";
// Constants
import { OAuthProviders } from "@/constants";
import { OAuthProvider } from "@/constants/types";
// Components
import { Button } from "../landing/Button";

// Interfaces
interface RightSideProps {
  page: "login" | "register";
}
interface FormInput {
  id: string;
  label: string;
  type: string;
  placeholder: string;
}

/**
 * RightSide Component
 *
 * @interface RightSideProps
 * @returns {JSX.Element} - RightSide Component
 * @exports RightSide
 */
export const RightSide: FC<RightSideProps> = ({ page }): JSX.Element => {
  // `useRegister` hook to register a new user, defined in the auth provider
  const { mutate: register, isLoading } = useRegister();

  /**
   * Handle register form submission
   * @param {FormEvent<HTMLFormElement>} e - Form event
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    // Prevent default form submission
    e.preventDefault();

    // Get form data
    const formData = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    );
    // Filter "terms" key
    delete formData.terms;

    // Call register mutation
    register(formData);
  };

  return page === "register" ? (
    <div className="flex flex-col justify-center items-center gap-4 2xl:gap-6 px-8 py-3 text-n-1 w-full min-w-[24rem] md:min-w-[29rem] max-h-[95vh]">
      <div className="flex flex-col justify-center mb-3 w-full">
        <h4 className="h4 font-medium">Get Started Now</h4>
        <p className="body-2 font-normal">
          Enter your credentials to create your account.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 w-full">
        {OAuthProviders.map((item: OAuthProvider) => (
          <Link
            key={item.id}
            to={item.href}
            className="text-[.8rem] px-5 py-3 bg-n-7 hover:bg-n-6 transition-all border-2 rounded-lg border-n-6 hover:border-n-5 flex items-center justify-center gap-[.6rem] text-nowrap font-medium text-n-2 hover:text-n-1"
            onClick={
              isLoading ? (e: MouseEvent) => e.preventDefault() : undefined
            }
          >
            <item.icon className="w-[1.15rem] h-[1.15rem]" />
            Sign up with {item.title}
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="bg-n-6 w-full h-[.125rem]"></div>
        <div className="text-n-3 px-[1.25rem] font-medium">or</div>
        <div className="bg-n-6 w-full h-[.125rem]"></div>
      </div>

      <Spin spinning={isLoading} wrapperClassName="w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
          {formInputs.map((input: FormInput, index: number) => (
            <div key={index} className="flex flex-col">
              <label
                htmlFor={input.id}
                className="text-[.9rem] pb-[.2rem] text-n-1"
              >
                {input.label}
              </label>
              <input
                className="input text-n-2 bg-n-6 border-2 border-n-6 focus:border-n-3 outline-none transition-all rounded-lg px-3 py-2 text-sm w-full"
                id={input.id}
                type={input.type}
                name={input.id}
                placeholder={input.placeholder}
                required
                disabled={isLoading}
              />
            </div>
          ))}

          <div className="mt-2">
            <label htmlFor="terms" className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 accent-n-9/80 focus:accent-n-9/80"
                name="terms"
                id="terms"
                required
              />
              <span className="ml-2 text-n-1">
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-n-3 hover:text-n-1 transition-all hover:underline"
                  onClick={
                    isLoading
                      ? (e: MouseEvent) => e.preventDefault()
                      : undefined
                  }
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-n-3 hover:text-n-1 transition-all hover:underline"
                  onClick={
                    isLoading
                      ? (e: MouseEvent) => e.preventDefault()
                      : undefined
                  }
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
          </div>

          <Button white type="submit" className="mt-2" disabled={isLoading}>
            {isLoading ? "Creating your account..." : "Register"}
          </Button>
        </form>
      </Spin>

      <div className="w-full flex items-center justify-center -mt-2">
        <p className="text-n-1 text-sm">
          Already a member?{" "}
          <Link
            to="/login"
            className="text-n-3 hover:text-n-1 transition-all underline hover:underline"
            onClick={
              isLoading ? (e: MouseEvent) => e.preventDefault() : undefined
            }
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  ) : (
    <div className="relative">
      <img
        src={Background}
        className="hidden min-w-[30rem] max-h-[90vh] rounded-xl object-cover lg:block"
        alt="Authentication background"
        draggable={false}
      />
      <div className="absolute top-0 left-0 right-0 bottom-0 hidden min-w-[30rem] max-h-[90vh] items-start justify-between flex-col p-10 lg:flex font-['Poppins']">
        <img
          src={AIScriptLogo}
          className="h-12 lg:h-15 aspect-auto"
          alt="AIScript Logo"
          draggable={false}
        />
        <div className="flex flex-col items-start justify-center h-full gap-7 text-n-1">
          <h4 className="h4 font-semibold">
            Save precious time <br /> with AI writing
          </h4>
          <Button>Watch Demo</Button>
        </div>
        <Link to="/" className="body-2 hover:text-n-1">
          Home
        </Link>
      </div>
    </div>
  );
};

const formInputs: FormInput[] = [
  {
    id: "email",
    label: "Email address",
    type: "email",
    placeholder: "name@gmail.com",
  },
  {
    id: "username",
    label: "Username",
    type: "text",
    placeholder: "johndoe",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••",
  },
];
