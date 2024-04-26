// Dependencies
import { FC } from "react";

// Components
import { ProfilePicture } from "./ProfilePicture";

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
  return (
    <div className="w-full h-[calc(100vh-3.5rem)] md:h-screen flex flex-col md:flex-row justify-center gap-6 overflow-y-auto p-4 md:p-6 font-['Poppins']">
      <div className="w-full md:w-2/5 flex flex-col items-center justify-start pt-3 md:pt-6">
        <ProfilePicture />
      </div>
      <div className="w-full md:w-3/5 h-full flex items-start justify-center gap-6 p-4">
        form
      </div>
    </div>
  );
};
