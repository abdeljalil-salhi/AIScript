// Dependencies
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { Col, Row } from "antd";
import { useNotification } from "@refinedev/core";

// Interfaces
interface CoverProps {
  file: [File | null, Dispatch<SetStateAction<File | null>>];
  isAiCover: [boolean, Dispatch<SetStateAction<boolean>>];
}

/**
 * Cover Component
 *
 * @interface CoverProps
 * @returns {JSX.Element} - Cover Component
 * @exports Cover
 */
export const Cover: FC<CoverProps> = ({ file, isAiCover }): JSX.Element => {
  /**
   * States to store the cover values
   */
  const [cover, setCover] = useState<string>("");

  /**
   * Notification hook to show notifications to the user
   */
  const { open } = useNotification();

  /**
   * Handle the cover image upload
   *
   * @param {ChangeEvent<HTMLInputElement>} e - The input change event
   * @returns {void}
   */
  const handleCover = (e: ChangeEvent<HTMLInputElement>): void => {
    const previewFile: File = e.target.files![0];

    // Check if the type is supported
    if (previewFile.type !== "image/png" && previewFile.type !== "image/jpeg") {
      // Empty the input
      e.target.value = "";

      // Show an error notification
      return open?.({
        type: "error",
        description: "Unable to upload image",
        message: "Please upload a supported image type.",
      });
    }

    const reader: FileReader = new FileReader();

    reader.onloadend = () => {
      setCover(reader.result as string);
    };

    // Read the file as a base64 data URL
    reader.readAsDataURL(previewFile);

    // Set the file to the state
    file[1](previewFile);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <label className="relative flex justify-start items-center group text-xl gap-3">
        <input
          type="checkbox"
          className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
          checked={isAiCover[0]}
          onChange={() => isAiCover[1](!isAiCover[0])}
        />
        <span className="w-10 h-6 flex items-center flex-shrink-0 p-1 bg-n-6/80 rounded-full duration-300 ease-in-out peer-checked:bg-n-10 after:w-4 after:h-4 after:bg-n-2 after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4 group-hover:after:translate-x-1"></span>
        <span className="text-n-10 duration-300 ease-in-out peer-checked:text-n-2 text-sm font-['Poppins']">
          AI Generated Cover
        </span>
      </label>
      {isAiCover[0] ? (
        <div className="w-full">
          <Row gutter={[10, 10]}>
            <Col xs={24} sm={8} xl={8}>
              <div className="flex flex-row gap-3 items-center justify-center bg-n-7 rounded-lg w-full aspect-square p-4 shadow-md cursor-pointer hover:shadow-lg">
                <div className="text-base">Cover 1</div>
              </div>
            </Col>
            <Col xs={24} sm={8} xl={8}>
              <div className="flex flex-row gap-3 items-center justify-center bg-n-7 rounded-lg w-full aspect-square p-4 shadow-md cursor-pointer hover:shadow-lg">
                <div className="text-base">Cover 2</div>
              </div>
            </Col>
            <Col xs={24} sm={8} xl={8}>
              <div className="flex flex-row gap-3 items-center justify-center bg-n-7 rounded-lg w-full aspect-square p-4 shadow-md cursor-pointer hover:shadow-lg">
                <div className="text-base">Cover 3</div>
              </div>
            </Col>
          </Row>
        </div>
      ) : cover ? (
        <>
          <div className="w-full aspect-square bg-n-7 rounded-lg relative overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition duration-300 ease-in-out">
            <img
              src={cover}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-end justify-start gap-3 p-4">
              <svg
                className="w-8 h-8 text-n-2 bg-n-10/50 rounded-full p-1 hover:bg-n-10/70 transition duration-300 ease-in-out"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                onClick={() => {
                  setCover("");
                  file[1](null);
                }}
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <span className="w-full text-center text-xs text-n-4">
            The cover image will be cropped to fit a 1000x1250px aspect ratio
          </span>
        </>
      ) : (
        <div className="flex flex-col gap-3 items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full aspect-square border-2 border-n-4/30 border-dashed rounded-lg cursor-pointer bg-n-7 hover:bg-n-6/50 transition duration-300 ease-in-out"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-n-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-n-4">
                <span className="font-semibold">Click to upload</span>
              </p>
              <p className="text-xs text-n-4">SVG, PNG or JPG up to 2MB</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleCover}
              accept="image/svg+xml, image/png, image/jpeg"
              required
            />
          </label>
          <span className="w-full text-center text-xs text-n-4">
            The cover image will be cropped to fit a 1000x1250px aspect ratio
          </span>
        </div>
      )}
    </div>
  );
};
