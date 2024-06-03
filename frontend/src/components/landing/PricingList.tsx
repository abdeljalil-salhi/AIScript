// Dependencies
import { FC } from "react";

// Assets
import { CheckSimpleIcon } from "@/assets/landing";
// Constants
import { pricing } from "@/constants";
import { Pricing } from "@/constants/types";
// Components
import { Button } from "./Button";

// Interfaces
interface PricingListProps {}

/**
 * PricingList Component
 *
 * @interface PricingListProps
 * @returns {JSX.Element} - PricingList Component
 * @exports PricingList
 */
export const PricingList: FC<PricingListProps> = (): JSX.Element => {
  return (
    <div className="flex gap-[1rem] max-lg:flex-wrap">
      {pricing.map((item: Pricing) => (
        <div
          key={item.id}
          className="w-[19rem] max-lg:w-full h-full px-6 bg-n-8 border border-n-6 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4 [&>h4]:first:text-cyan-400/80 [&>h4]:even:text-color-2 [&>h4]:last:text-color-6 font-['Poppins'] lg:flex-1"
        >
          <h4 className="h4 mb-4">{item.title}</h4>
          <p className="body-2 min-h-[4rem] mb-3 text-n-1/50">
            {item.description}
          </p>
          <div className="flex items-center h-[5.5rem] mb-6">
            {item.price !== "0" ? (
              <>
                <div className="h3">$</div>
                <div className="text-[5.5rem] leading-none font-semibold">
                  {item.price}
                </div>
              </>
            ) : (
              <div className="text-[5.5rem] leading-none font-semibold">
                Free
              </div>
            )}
          </div>
          <Button
            className="w-full mb-6"
            href={item.price ? "/pricing" : "mailto:abdelisloading@gmail.com"}
            white={item.price === "0"}
          >
            {item.price ? "Get started" : "Contact us"}
          </Button>
          <ul>
            {item.features.map((feature: string, index: number) => (
              <li
                key={index}
                className="flex items-start py-5 border-t border-n-6"
              >
                <img
                  src={CheckSimpleIcon}
                  width={24}
                  height={24}
                  alt="Check Icon"
                  draggable={false}
                />
                <p className="body-2 ml-4">{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
