// Dependencies
import { FC } from "react";

// Assets
import { CurveOne, CurveTwo } from "@/assets/landing";

// Interfaces
interface RightCurveProps {}
interface LeftCurveProps {}

/**
 * RightCurve Component;
 * Used to render the right curve in the Collaboration component.
 * Going from the collaboration circle to the right side of the screen.
 *
 * @interface RightCurveProps
 * @returns {JSX.Element} - RightCurve Component
 * @exports RightCurve
 */
export const RightCurve: FC<RightCurveProps> = (): JSX.Element => {
  return (
    <div className="hidden absolute top-1/2 left-full w-[10.125rem] -mt-1 ml-10 pointer-events-none xl:block">
      <img src={CurveTwo} width={162} height={76} alt="Curve 2" />
    </div>
  );
};

/**
 * LeftCurve Component;
 * Used to render the left curve in the Collaboration component.
 * Going from the 'Try it now' button to the collaboration circle.
 *
 * @interface LeftCurveProps
 * @returns {JSX.Element} - LeftCurve Component
 * @exports LeftCurve
 */
export const LeftCurve: FC<LeftCurveProps> = (): JSX.Element => {
  return (
    <div className="hidden absolute top-1/2 right-full w-[32.625rem] -mt-1 mr-10 pointer-events-none xl:block">
      <img src={CurveOne} width={522} height={182} alt="Curve 1" />
    </div>
  );
};
