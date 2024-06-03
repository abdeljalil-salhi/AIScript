// Dependencies
import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { useDocumentTitle } from "@refinedev/react-router-v6";

// Components
import { ProfilePicture } from "./ProfilePicture";
import { SettingsForm } from "./SettingsForm";

// Interfaces
interface ProfilePageProps {}

/**
 * Profile Page Component
 *
 * @interface ProfilePageProps
 * @returns {JSX.Element} - Profile Page Component
 * @exports ProfilePage
 */
export const ProfilePage: FC<ProfilePageProps> = (): JSX.Element => {
  useDocumentTitle("AIScript - Your Profile");

  return (
    <>
      <Helmet>
        <title>AIScript - Your Profile</title>
        <meta
          name="description"
          content="Manage your AIScript profile and take control of your book creation journey. Access your settings, preferences, and past creations effortlessly."
        />
      </Helmet>

      <div className="w-full md:h-full flex flex-col md:flex-row justify-center gap-6 lg:gap-32 overflow-y-auto p-4 md:p-6 lg:p-16 font-['Poppins']">
        <div className="w-full md:w-2/5 flex flex-col items-center lg:items-end justify-start pt-20 md:pt-6">
          <ProfilePicture />
        </div>
        <div className="w-full md:w-3/5 h-full flex flex-col items-center lg:items-start justify-start gap-6 p-4 md:pt-6">
          <SettingsForm />
        </div>
      </div>
    </>
  );
};
