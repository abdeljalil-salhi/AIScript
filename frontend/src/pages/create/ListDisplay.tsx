// Dependencies
import { FC } from "react";

// Constants
import { showcaseItems } from "@/constants/home";

// Interfaces
interface ListDisplayProps {}

/**
 * ListDisplay Component
 *
 * @interface ListDisplayProps
 * @returns {JSX.Element} - ListDisplay Component
 * @exports ListDisplay
 */
export const ListDisplay: FC<ListDisplayProps> = (): JSX.Element => {
  return (
    <div className="w-full flex flex-col">
      {showcaseItems.map((showcaseItem) => (
        <div
          key={showcaseItem.id}
          className="w-full flex flex-row items-center justify-start gap-3 bg-n-8 hover:bg-n-7 transition-all duration-200 p-2 cursor-pointer font-['Poppins']"
        >
          <div className="min-w-[70px] min-h-[70px] h-[70px] w-[70px] rounded-lg overflow-hidden shadow-md bg-n-9/35">
            <img
              src={showcaseItem.imageUrl}
              alt={showcaseItem.title}
              className="w-full h-full object-cover rounded-lg"
              draggable={false}
            />
          </div>
          <div className="w-2/3">
            <h3
              className="font-normal text-ellipsis whitespace-nowrap overflow-hidden text-n-1"
              title={showcaseItem.title}
            >
              {showcaseItem.title}
            </h3>
            <p
              className="text-xs text-n-4 text-ellipsis whitespace-nowrap overflow-hidden"
              title={showcaseItem.description}
            >
              {showcaseItem.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
