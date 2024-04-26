// Dependencies
import { FC, MouseEvent, useState } from "react";

// Constants
import { defaultProfilePicture } from "@/constants";

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
  const [cover, setCover] = useState<string>("");

  const handleCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setCover(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    // Save the image to the server
    alert("Image saved successfully!");
  };

  return (
    <>
      <label htmlFor="profile-picture">
        <img
          className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-n-5 cursor-pointer"
          src={cover || "https://avatars.githubusercontent.com/u/65598953?v=4"}
          alt="Bordered avatar"
          draggable={false}
        />
      </label>
      <label
        htmlFor={cover ? "" : "profile-picture"}
        className="mt-4 px-4 py-2 w-40 text-center bg-n-6 hover:bg-n-6/70 text-n-1 rounded-md shadow-md cursor-pointer transition-all ease-in-out"
        onClick={
          cover
            ? (e: MouseEvent) => {
                e.preventDefault();
                setCover("");
              }
            : undefined
        }
      >
        {cover ? "Undo" : "Upload image"}
      </label>
      <input
        type="file"
        id="profile-picture"
        className="hidden"
        onChange={handleCover}
        accept="image/png, image/jpeg"
      />
      {cover ? (
        <button
          className="mt-3 px-4 py-2 w-40 text-center bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-md shadow-md cursor-pointer transition-all ease-in-out"
          onClick={handleSave}
        >
          Save
        </button>
      ) : (
        <button
          className="mt-3 px-4 text-red-500 hover:text-red-600 cursor-pointer transition-all ease-in-out"
          onClick={() => setCover(defaultProfilePicture)}
        >
          Remove image
        </button>
      )}
    </>
  );
};
