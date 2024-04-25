// Dependencies
import { FC } from "react";

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
  return (
    <div className="w-full h-[calc(100vh-3.5rem)] md:h-screen flex flex-col gap-6 overflow-y-auto">
      <Header />
      <ListDisplay />
    </div>
  );
};
