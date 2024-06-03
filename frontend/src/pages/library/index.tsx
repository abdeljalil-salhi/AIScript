// Dependencies
import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { useDocumentTitle } from "@refinedev/react-router-v6";

// Components
import { Header } from "./Header";
import { ListDisplay } from "./ListDisplay";

// Interfaces
interface LibraryPageProps {}

/**
 * Library Page Component
 *
 * @interface LibraryPageProps
 * @returns {JSX.Element} - Library Page Component
 * @exports LibraryPage
 */
export const LibraryPage: FC<LibraryPageProps> = (): JSX.Element => {
  useDocumentTitle("AIScript - Your Library");

  return (
    <>
      <Helmet>
        <title>AIScript - Your Library</title>
        <meta
          name="description"
          content="Manage your books with ease. Access your books from anywhere and anytime."
        />
      </Helmet>

      <div className="w-full h-[calc(100vh-3.5rem)] md:h-screen flex flex-col gap-6 overflow-y-auto">
        <Header />
        <ListDisplay />
      </div>
    </>
  );
};
