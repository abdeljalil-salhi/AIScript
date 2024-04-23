// Dependencies
import { FC, useState } from "react";
import { Col, Row } from "antd";

// Interfaces
interface CoverProps {}

/**
 * Cover Component
 *
 * @interface CoverProps
 * @returns {JSX.Element} - Cover Component
 * @exports Cover
 */
export const Cover: FC<CoverProps> = (): JSX.Element => {
  const [aiCover, setAiCover] = useState<boolean>(false);
  const [cover, setCover] = useState<string>("");

  const handleCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setCover(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <label className="relative flex justify-start items-center group text-xl gap-3">
        <input
          type="checkbox"
          className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
          checked={aiCover}
          onChange={() => setAiCover(!aiCover)}
        />
        <span className="w-10 h-6 flex items-center flex-shrink-0 p-1 bg-n-6/80 rounded-full duration-300 ease-in-out peer-checked:bg-n-10 after:w-4 after:h-4 after:bg-n-2 after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4 group-hover:after:translate-x-1"></span>
        <span className="text-n-10 duration-300 ease-in-out peer-checked:text-n-2 text-sm font-['Poppins']">
          AI Generated Cover
        </span>
      </label>
      {aiCover ? (
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
        <div className="w-full aspect-square bg-n-7 rounded-lg relative overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition duration-300 ease-in-out">
          <img src={cover} className="w-full h-full object-cover rounded-lg" />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-end justify-start gap-3 p-4">
            <svg
              className="w-8 h-8 text-n-2 bg-n-10/50 rounded-full p-1 hover:bg-n-10/70 transition duration-300 ease-in-out"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              onClick={() => setCover("")}
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
        </div>
      )}
    </div>
  );
};
