// Dependencies
import { FC } from "react";
import { Link } from "react-router-dom";

// Components
import { SVG404 } from "./SVG404";

// Interfaces
interface Error404PageProps {}

/**
 * Error 404 Page Component
 *
 * @interface Error404PageProps
 * @returns {JSX.Element} - Error 404 Page Component
 * @exports Error404Page
 */
export const Error404Page: FC<Error404PageProps> = (): JSX.Element => {
  return (
    <div className="p-4 md:p-6 w-full h-[calc(100vh-3.5rem)] md:h-screen flex flex-col gap-6 overflow-y-auto">
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <SVG404 />

        <div className="flex flex-col items-center justify-center font-['Poppins']">
          <p className="text-3xl md:text-4xl lg:text-5xl text-n-3/70 mt-12">
            Page not found
          </p>
          <p className="md:text-lg lg:text-xl text-n-3/70 mt-8">
            Looks like you've found the doorway to the great nothingness.
          </p>
          <Link
            to="/home"
            className="flex items-center space-x-2 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl text-n-1 hover:text-n-1 font-medium px-4 py-2 mt-12 rounded transition duration-150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};