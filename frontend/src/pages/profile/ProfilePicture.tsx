// Dependencies
import { FC, MouseEvent, useEffect, useState } from "react";
import { useGetIdentity } from "@refinedev/core";

// Constants
import { defaultProfilePicture } from "@/constants";
// Types
import { MeResponse } from "@/graphql/schema.types";

// Interfaces
interface ProfilePictureProps {}

/**
 * ProfilePicture Component
 *
 * @interface ProfilePictureProps
 * @returns {JSX.Element} - ProfilePicture Component
 * @exports ProfilePicture
 */
export const ProfilePicture: FC<ProfilePictureProps> = (): JSX.Element => {
  /**
   * States to store avatar values
   * @type {string}
   */
  const [previewAvatar, setPreviewAvatar] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  /**
   * Get the user's identity
   * @type {MeResponse}
   */
  const { data: identity, isLoading } = useGetIdentity<MeResponse>();

  useEffect(() => {
    if (identity) {
      setAvatar(identity.user.avatar?.filename || "");
    }
  }, [identity]);

  const handlePreviewAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    // Save the image to the server
    setPreviewAvatar("");
    alert("Image saved successfully!");
  };

  return (
    <>
      <label htmlFor="profile-picture">
        {isLoading && !avatar ? (
          <div className="w-40 h-40 p-1 rounded-full ring-2 ring-n-5 bg-n-6 animate-pulse"></div>
        ) : (
          <img
            className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-n-5 cursor-pointer"
            src={previewAvatar || avatar}
            draggable={false}
          />
        )}
      </label>
      <label
        htmlFor={previewAvatar ? "" : "profile-picture"}
        className="mt-4 px-4 py-2 w-40 text-center bg-n-6 hover:bg-n-6/70 text-n-1 rounded-md shadow-md cursor-pointer transition-all ease-in-out"
        onClick={
          previewAvatar
            ? (e: MouseEvent) => {
                e.preventDefault();
                setPreviewAvatar("");
              }
            : undefined
        }
      >
        {previewAvatar ? "Undo" : "Upload image"}
      </label>
      <input
        type="file"
        id="profile-picture"
        className="hidden"
        onChange={handlePreviewAvatar}
        accept="image/png, image/jpeg"
      />
      {previewAvatar ? (
        <button
          className="mt-3 px-4 py-2 w-40 text-center bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-md shadow-md cursor-pointer transition-all ease-in-out"
          onClick={handleSave}
        >
          Save
        </button>
      ) : (
        !isLoading &&
        avatar &&
        avatar !== defaultProfilePicture && (
          <button
            className="mt-3 px-4 text-red-500 hover:text-red-600 cursor-pointer transition-all ease-in-out"
            onClick={() => setPreviewAvatar(defaultProfilePicture)}
          >
            Remove image
          </button>
        )
      )}
    </>
  );
};
