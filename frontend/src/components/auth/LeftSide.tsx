// Dependencies
import { FC } from "react";
import { Link } from "react-router-dom";

// Assets
import { brainwave, heroBackground } from "@/assets";
// Components
import { Button } from "../Button";

// Interfaces
interface LeftSideProps {}

/**
 * LeftSide Component
 *
 * @interface LeftSideProps
 * @returns {JSX.Element} - LeftSide Component
 * @exports LeftSide
 */
export const LeftSide: FC<LeftSideProps> = (): JSX.Element => {
  return (
    <div className="relative">
      <img
        src={heroBackground}
        className="hidden w-[30rem] max-h-[80vh] rounded-xl object-cover md:block"
        alt="Authentication background"
        draggable={false}
      />
      <div className="absolute top-0 left-0 right-0 bottom-0 hidden w-[30rem] max-h-[80vh] items-start justify-between flex-col p-10 md:flex">
        <img src={brainwave} alt="AIScript Logo" draggable={false} />
        <div className="flex flex-col items-start justify-center h-full gap-9 text-white">
          <h3 className="h4 text-white font-bold">Write e-books in seconds</h3>
          <Button>Watch Demo</Button>
        </div>
        <Link to="/" className="body-2 hover:text-n-1">
          Home
        </Link>
      </div>
    </div>
  );
};
