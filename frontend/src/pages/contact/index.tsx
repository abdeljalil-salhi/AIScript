// Dependencies
import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { useDocumentTitle } from "@refinedev/react-router-v6";

// Components
import { ContactForm } from "./ContactForm";
import { Header } from "./Header";

// Interfaces
interface ContactPageProps {}

/**
 * Contact Page Component
 *
 * @interface ContactPageProps
 * @returns {JSX.Element} - ContactPage Component
 * @exports ContactPage
 */
export const ContactPage: FC<ContactPageProps> = (): JSX.Element => {
  useDocumentTitle("AIScript - Contact Us");

  return (
    <>
      <Helmet>
        <title>AIScript - Contact Us</title>
        <meta
          name="description"
          content="Need help? Contact us and we'll get back to you as soon as possible. We're here to help you with any questions or concerns you may have."
        />
      </Helmet>

      <div className="w-full md:h-full flex flex-col items-center justify-start gap-2 overflow-y-auto p-4 md:p-6 lg:p-16 font-['Poppins']">
        <Header />
        <ContactForm />
      </div>
    </>
  );
};
