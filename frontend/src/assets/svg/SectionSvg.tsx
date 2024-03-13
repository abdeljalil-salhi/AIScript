// Dependencies
import { FC } from "react";

// Components
import { PlusSvg } from "./PlusSvg";

// Interfaces
interface SectionSvgProps {
  crossesOffset?: string;
}

/**
 * SectionSvg Component
 *
 * @interface SectionSvgProps
 * @returns {JSX.Element} - SectionSvg Component
 * @exports SectionSvg
 */
export const SectionSvg: FC<SectionSvgProps> = ({
  crossesOffset,
}): JSX.Element => {
  return (
    <>
      <PlusSvg
        className={`hidden absolute -top-[0.3125rem] left-[1.5625rem] ${
          crossesOffset && crossesOffset
        } pointer-events-none lg:block xl:left-[2.1875rem]`}
      />

      <PlusSvg
        className={`hidden absolute  -top-[0.3125rem] right-[1.5625rem] ${
          crossesOffset && crossesOffset
        } pointer-events-none lg:block xl:right-[2.1875rem]`}
      />
    </>
  );
};
