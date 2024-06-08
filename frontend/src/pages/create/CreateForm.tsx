// Dependencies
import { FC, FormEvent, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { Spin } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useGetIdentity, useNotification } from "@refinedev/core";

// Assets
import { LoadingBook } from "@/assets/create";
// Components
import { ChaptersAndSections } from "@/components/create/ChaptersAndSections";
import { Cover } from "@/components/create/Cover";
// Constants
import { suggestions } from "@/constants/home";
// Utils
import { secureRandomIndexes } from "@/utils/secureRandomIndexes";
// Contexts
import { BookData } from "@/contexts/socket/interfaces/entities/book-data.interface";
import { SocketContext } from "@/contexts/socket";
import { SocketContext as ISocketContext } from "@/contexts/socket/interfaces/socket-context.interface";
// GraphQL Types
import { MeResponse } from "@/graphql/schema.types";
// Utils
import { isFreePlan } from "@/utils/isFreePlan";
// Providers
import { BASE_URL } from "@/providers";

/**
 * @description
 * The websocket connection.
 * It is used to emit and listen to events.
 * @type {Socket<ServerToClientEvents, ClientToServerEvents>}
 */
import { ws } from "@/sockets";

// Interfaces
interface CreateFormProps {}

/**
 * CreateForm Component
 *
 * @interface CreateFormProps
 * @returns {JSX.Element} - CreateForm Component
 * @exports CreateForm
 */
export const CreateForm: FC<CreateFormProps> = (): JSX.Element => {
  /**
   * The number of chapters and sections in the book.
   * @type {number}
   * @default 3
   */
  const [chapters, setChapters] = useState<number>(3);
  const [sections, setSections] = useState<number>(3);

  /**
   * State to know if the book cover should be AI generated or not.
   * @type {boolean}
   * @default false
   */
  const [isAiCover, setIsAiCover] = useState<boolean>(false);

  /**
   * State to store the book cover file.
   * @type {File | null}
   */
  const [file, setFile] = useState<File | null>(null);

  /**
   * Get the location state from the URL
   * @type {{ topic: string }}
   */
  const { state } = useLocation();

  /**
   * State to store the loading state of the form.
   * @type {boolean}
   * @default false
   */
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Use the socket context to get the queue informations.
   */
  const { queue } = useContext<ISocketContext>(SocketContext);

  /**
   * Notification hook to show notifications to the user
   */
  const { open } = useNotification();

  /**
   * Get the user's identity
   * @type {MeResponse}
   */
  const { data: identity, isLoading: isIdentityLoading } =
    useGetIdentity<MeResponse>();

  /**
   * Calculates the price of the book based on the provided book data.
   *
   * @returns {number} - The calculated price of the book.
   */
  const calculateBookPrice = (): number => {
    const isOverFiveChapters: boolean = chapters > 5;
    const isOverFiveSectionsAndFiveChapters: boolean =
      isOverFiveChapters && sections > 5;
    const isCoverAiGenerated: boolean = isAiCover;
    return (
      (isOverFiveChapters ? 15 : 10) +
      (isOverFiveSectionsAndFiveChapters ? 5 : 0) +
      (isCoverAiGenerated ? 10 : 0)
    );
  };

  /**
   * The price of the book creation.
   * @type {number}
   */
  const price: number = calculateBookPrice();

  /**
   * Handle the form submission.
   *
   * @param {FormEvent<HTMLFormElement>} e - The form event.
   * @returns {Promise<void>}
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    let cover: string = "ai";

    // If the identity is loading or not available, stop the form submission.
    if (isIdentityLoading || !identity || isLoading) return;

    // If the user's balance is less than 10, show an error notification.
    if (identity.user.wallet!.balance < price)
      return open?.({
        type: "error",
        description: "Insufficient Balance",
        message: `You need ${price} credits to create your book. Your current balance is ${
          identity.user.wallet!.balance
        } credits. Please add funds to your wallet.`,
        key: "insufficient-balance",
      });

    // Set the loading state to true
    setIsLoading(true);

    // Prepare the form data
    const formData = new FormData(e.currentTarget);

    if (!isAiCover) {
      // Check if the file is available
      if (!file) {
        // Set the loading state to false
        setIsLoading(false);

        // Show an error notification
        return open?.({
          type: "error",
          description: "Something went wrong",
          message: "Please try re-uploading the cover image again.",
          key: "cover-image",
        });
      }

      // Append the cover file to the form data
      formData.append("cover", file, file.name);

      // Upload the cover image
      const result: Response = await fetch(`${BASE_URL}/book/upload`, {
        method: "POST",
        body: formData,
      });

      // Check if the request was successful
      if (result.statusText !== "Created") {
        // Set the loading state to false
        setIsLoading(false);

        // Show an error notification
        return open?.({
          type: "error",
          description: "Unable to upload image",
          message:
            "Your changes were saved, but we could not upload the book cover due to a technical issue on our end. Please try again.",
          key: "cover-image-upload",
        });
      }

      cover = await result.text();

      formData.delete("cover");
    }

    // Get the values from the form data
    const author: string = formData.get("author") as string;
    const title: string = formData.get("title") as string;
    const topic: string = formData.get("topic") as string;
    const target_audience: string =
      (formData.get("target-audience") as string) || "General Audience";

    // Prepare the book data
    const data: BookData = {
      name: uuidv4(),
      author,
      title,
      topic,
      target_audience,
      num_chapters: chapters,
      num_subsections: sections,
      cover: cover,
    };

    // Emit the event to join the queue based on the user's plan
    if (isFreePlan(identity.user.subscription?.plan))
      ws.emit("joinSharedQueue", data);
    else ws.emit("joinPriorityQueue", data);

    // Set the loading state to false
    setIsLoading(false);
  };

  /**
   * Leaves the queue based on the user's subscription plan.
   * If the user is on the free plan, leave the shared queue.
   * If the user is on the premium plan, leave the priority queue.
   *
   * @returns {void}
   */
  const handleLeaveQueue = (): void => {
    // If the identity is loading or not available, stop the leave queue action.
    if (isIdentityLoading || !identity) return;

    if (isFreePlan(identity.user.subscription?.plan))
      ws.emit("leaveSharedQueue");
    else ws.emit("leavePriorityQueue");
  };

  return queue.isChecking ? (
    <div className="w-full h-full flex items-center justify-center font-['Poppins']">
      <Spin />
    </div>
  ) : queue.inQueue ? (
    <div className="w-full h-full flex flex-col gap-3 font-['Poppins']">
      <div className="w-full h-full flex items-center justify-center flex-col gap-5">
        <img
          src={LoadingBook}
          className="w-full max-w-28 aspect-square animate-pulse"
          alt="Please wait while we create your book."
          draggable={false}
        />

        <p className="text-sm text-center">
          {queue.positionInQueue <= 1
            ? "Please wait while we create your book"
            : `${queue.positionInQueue} Jobs are in the queue`}
        </p>
        {queue.positionInQueue > 1 && (
          <button
            className="w-full text-transparent bg-gradient-to-br from-purple-600 hover:from-purple-600/80 to-blue-500 hover:to-blue-500/80 webkit-bg-clip-text inline-block text-sm tracking-wide cursor-pointer transition-all duration-300 ease-in-out text-center"
            onClick={handleLeaveQueue}
          >
            Leave queue
          </button>
        )}
      </div>
    </div>
  ) : (
    <form
      className="w-full flex flex-col gap-3 font-['Poppins']"
      onSubmit={handleSubmit}
    >
      <div className="w-full flex flex-col gap-1">
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          className="w-full p-2 bg-transparent border border-n-6/70 rounded-md outline-none focus:border-n-4 duration-300 ease-in-out font-light"
          placeholder="The name displayed on the cover"
          required
        />
      </div>

      <div className="w-full flex flex-col gap-1">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className="w-full p-2 bg-transparent border border-n-6/70 rounded-md outline-none focus:border-n-4 duration-300 ease-in-out font-light"
          placeholder="e.g. How to be healthy"
          required
        />
      </div>

      <div className="w-full flex flex-col gap-1">
        <label htmlFor="topic">Topic</label>
        <textarea
          id="topic"
          name="topic"
          className="w-full min-h-16 p-2 bg-transparent border border-n-6/70 rounded-md outline-none focus:border-n-4 duration-300 ease-in-out font-light"
          placeholder={
            suggestions[secureRandomIndexes(suggestions.length, 1)[0]].content
          }
          defaultValue={state?.topic || ""}
          required
        />
      </div>

      <div className="w-full flex flex-col gap-1">
        <label htmlFor="target-audience">Target Audience</label>
        <input
          type="text"
          id="target-audience"
          name="target-audience"
          className="w-full p-2 bg-transparent border border-n-6/70 rounded-md outline-none focus:border-n-4 duration-300 ease-in-out font-light"
          placeholder="e.g. Adults, Teenagers"
        />
      </div>

      <ChaptersAndSections
        chapters={[chapters, setChapters]}
        sections={[sections, setSections]}
      />

      <Cover file={[file, setFile]} isAiCover={[isAiCover, setIsAiCover]} />

      <div className="w-full mt-2">
        <button
          type="submit"
          className="w-full text-base bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg px-5 py-2.5 text-center transition-all duration-300 ease-in-out transform disabled:opacity-80 disabled:cursor-progress"
          disabled={isLoading}
        >
          Create for {price} credits
        </button>
      </div>
      <div className="w-full text-xs text-n-4">
        The book will be created in the background. You can close this page and
        come back later to see the progress.
      </div>
    </form>
  );
};
