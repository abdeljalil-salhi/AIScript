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
    <>
      <div className="w-full flex flex-col md:flex-row">
        <div className="w-full md:w-2/5 min-h-0 h-[50vh] md:min-h-screen border-b md:border-r border-n-6/70 p-4 sticky md:static top-0 overflow-y-scroll md:overflow-y-auto"
        >
          <CreateForm />
        </div>
        <div className="w-full md:w-3/5 min-h-0 h-[calc(50vh-3.5rem)] md:min-h-screen p-4 sticky md:static bottom-0 overflow-y-auto"></div>
      </div>
    </>
  );
};
