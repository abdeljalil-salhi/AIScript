// Dependencies
import { FC, FormEvent } from "react";
import { Link } from "react-router-dom";

// Assets
import { brainwave, heroBackground } from "@/assets";
// Constants
import { OAuthProviders } from "@/constants";
import { OAuthProvider } from "@/constants/types";
// Components
import { Button } from "../Button";

// Interfaces
interface LeftSideProps {
  page: "login" | "register";
}
interface FormInput {
  id: string;
  label: string;
  type: string;
  placeholder: string;
}

/**
 * LeftSide Component
 *
 * @interface LeftSideProps
 * @returns {JSX.Element} - LeftSide Component
 * @exports LeftSide
 */
export const LeftSide: FC<LeftSideProps> = ({ page }): JSX.Element => {
  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    console.log("submitted");
  };

  return page === "register" ? (
    <div className="relative">
      <img
        src={heroBackground}
        className="hidden min-w-[30rem] max-h-[90vh] rounded-xl object-cover lg:block"
        alt="Authentication background"
        draggable={false}
      />
      <div className="absolute top-0 left-0 right-0 bottom-0 hidden min-w-[30rem] max-h-[90vh] items-start justify-between flex-col p-10 lg:flex">
        <img src={brainwave} alt="AIScript Logo" draggable={false} />
        <div className="flex flex-col items-start justify-center h-full gap-7 text-n-1">
          <h4 className="h4 font-bold">Write e-books in seconds</h4>
          <Button>Watch Demo</Button>
        </div>
        <Link to="/" className="body-2 hover:text-n-1">
          Home
        </Link>
      </div>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center gap-4 2xl:gap-6 px-8 py-3 text-n-1 w-full min-w-[24rem] md:min-w-[29rem] max-h-[95vh]">
      <div className="flex flex-col justify-center mb-3 w-full">
        <h4 className="h4 font-medium">Welcome back</h4>
        <p className="body-2 font-normal">Enter your credentials to log in.</p>
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
        <div className="flex justify-between items-center mt-2">
          <label htmlFor="remember" className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 accent-n-9/80 focus:accent-n-9/80"
              name="remember"
              id="remember"
              required
            />
            <span className="ml-2 text-n-1">Remember me</span>
          </label>
          <p className="text-n-1 text-sm">
            <Link
              to="/forgot-password"
              className="text-n-3 hover:text-n-1 transition-all hover:underline"
            >
              Forgot your password?
            </Link>
          </p>
        </div>
        <Button white type="submit" className="mt-2">
          Log in
        </Button>
      </form>
      <div className="w-full flex items-center justify-center">
        <p className="text-n-1 text-sm">
          Don't have an account yet?{" "}
          <Link
            to="/register"
            className="text-n-3 hover:text-n-1 transition-all underline hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

const formInputs: FormInput[] = [
  {
    id: "usernameOrEmail",
    label: "Username or email",
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
