// Dependencies
import { FC } from "react";
import { companyLogos } from "@/constants";

// Interfaces
interface CompanyLogosProps {
  className?: string;
}

/**
 * CompanyLogos Component
 *
 * @interface CompanyLogosProps
 * @returns {JSX.Element} - CompanyLogos Component
 * @exports CompanyLogos
 */
export const CompanyLogos: FC<CompanyLogosProps> = ({
  className,
}): JSX.Element => {
  return (
    <div className={className}>
      <h5 className="tagline mb-6 text-center ttext-n-1/50">
        Helping people create beautiful content at
      </h5>
      <ul className="flex">
        {companyLogos.map((logo, index: number) => (
          <li
            key={index}
            className="flex items-center justify-center flex-1 h-[8.5rem]"
          >
            <img src={logo} width={134} height={28} alt="Company Logo" />
          </li>
        ))}
      </ul>
    </div>
  );
};
