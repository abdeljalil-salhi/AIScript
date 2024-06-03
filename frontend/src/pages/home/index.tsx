// Dependencies
import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { useDocumentTitle } from "@refinedev/react-router-v6";

// Components
import { Header } from "./Header";
import { Showcase } from "./Showcase";

// Interfaces
interface HomePageProps {}

/**
 * Home Page Component
 *
 * @interface HomePageProps
 * @returns {JSX.Element} - Home Page Component
 * @exports HomePage
 */
export const HomePage: FC<HomePageProps> = (): JSX.Element => {
  useDocumentTitle("AIScript - Effortless AI Book Creation");

  return (
    <>
      <Helmet>
        <title>AIScript - Effortless AI Book Creation</title>
        <meta
          name="description"
          content="Discover AIScript, the ultimate platform for effortless AI book creation. Generate high-quality books and custom covers in seconds with our advanced AI technology. Join the future of book creation today."
        />
      </Helmet>

      <div className="p-4 md:p-6 w-full h-[calc(100vh-3.5rem)] md:h-screen flex flex-col gap-6 overflow-y-auto">
        <Header />
        <Showcase />
      </div>
    </>
  );
};
