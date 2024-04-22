// Dependencies
import { FC } from "react";

// Components
import { Cover } from "./Cover";

// Interfaces
interface CreatePageProps {}

/**
 * Create Page Component
 *
 * @interface CreatePageProps
 * @returns {JSX.Element} - Create Page Component
 * @exports CreatePage
 */
export const CreatePage: FC<CreatePageProps> = (): JSX.Element => {
  return (
    <div className="w-full flex flex-row">
      <div className="w-1/3 min-h-screen border-r border-n-6/70 p-4">
        <Cover />
      </div>
      <div className="w-2/3 min-h-screen p-4"></div>
    </div>
  );
};
