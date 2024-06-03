// Dependencies
import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { useDocumentTitle } from "@refinedev/react-router-v6";

// Components
import { CreateForm } from "./CreateForm";
import { ListDisplay } from "../library/ListDisplay";

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
  useDocumentTitle("AIScript - Create a New Book");

  return (
    <>
      <Helmet>
        <title>AIScript - Create a New Book</title>
        <meta
          name="description"
          content="Create a new book with AIScript. Display the books you have created and manage them with ease. Join the future of book creation today."
        />
      </Helmet>

      <div className="w-full flex flex-col md:flex-row">
        <div className="w-full md:w-2/5 min-h-0 h-[50vh] md:min-h-screen border-b md:border-r border-n-6/70 p-4 sticky md:static top-0 overflow-y-auto">
          <CreateForm />
        </div>
        <div className="w-full md:w-3/5 min-h-0 h-[calc(50vh-3.5rem)] md:min-h-screen sticky md:static bottom-0 overflow-y-auto">
          <ListDisplay />
        </div>
      </div>
    </>
  );
};
