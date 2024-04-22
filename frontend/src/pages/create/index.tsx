// Dependencies
import { FC } from "react";

// Components
import { CreateForm } from "./CreateForm";

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
      <div className="w-2/5 min-h-screen border-r border-n-6/70 p-4">
        <CreateForm />
      </div>
      <div className="w-3/5 min-h-screen p-4"></div>
    </div>
  );
};
