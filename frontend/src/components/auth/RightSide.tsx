// Dependencies
import { FC, FormEvent } from "react";
import { Link } from "react-router-dom";

// Constants
import { OAuthProviders } from "@/constants";
import { OAuthProvider } from "@/constants/types";
import { Button } from "../Button";

// Interfaces
interface RightSideProps {}
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
export const RightSide: FC<RightSideProps> = (): JSX.Element => {
  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
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
          >
            <item.icon className="w-[1.15rem] h-[1.15rem]" />
            Log in with {item.title}
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="bg-n-6 w-full h-[.125rem]"></div>
        <div className="text-n-3 px-[1.25rem] font-medium">or</div>
        <div className="bg-n-6 w-full h-[.125rem]"></div>
      </div>
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
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-n-3 hover:text-n-1 transition-all hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>
        </div>
        <Button white type="submit" className="mt-2">
          Register
        </Button>
      </form>
      <div className="w-full flex items-center justify-center -mt-2">
        <p className="text-n-1 text-sm">
          Already a member?{" "}
          <Link
            to="/login"
            className="text-n-3 hover:text-n-1 transition-all underline hover:underline"
          >
            Log in
          </Link>
        </p>
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
