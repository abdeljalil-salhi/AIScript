// Dependencies
import { FC, useContext } from "react";
import { Spin } from "antd";
import { useGetIdentity } from "@refinedev/core";

// Components
import { ChaptersAndSections } from "@/components/create/ChaptersAndSections";
import { Cover } from "@/components/create/Cover";
// Constants
import { suggestions } from "@/constants/home";
// Utils
import { secureRandomIndexes } from "@/utils/secureRandomIndexes";
// Contexts
import { SocketContext } from "@/contexts/socket";
import { SocketContext as ISocketContext } from "@/contexts/socket/interfaces/socket-context.interface";
// GraphQL Types
import { MeResponse } from "@/graphql/schema.types";
// Utils
import { isFreePlan } from "@/utils/isFreePlan";

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
   * Use the socket context to get the queue informations.
   */
  const { queue } = useContext<ISocketContext>(SocketContext);

  /**
   * Get the user's identity
   * @type {MeResponse}
   */
  const { data: identity, isLoading: isIdentityLoading } =
    useGetIdentity<MeResponse>();

  /**
   * Handle the form submission.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   * @returns {void}
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // If the identity is loading or not available, stop the form submission.
    if (isIdentityLoading || !identity) return;

    console.log("CreateForm handleSubmit");

    if (isFreePlan(identity.user.subscription?.plan))
      ws.emit("joinSharedQueue");
    else ws.emit("joinPriorityQueue");
  };

  console.log(queue);

  return queue.isChecking ? (
    <div className="w-full h-full flex items-center justify-center font-['Poppins']">
      <Spin />
    </div>
  ) : queue.inQueue ? (
    <div className="w-full flex flex-col gap-3 font-['Poppins']">
      <div className="w-full flex flex-col gap-1">
        <label>Queue</label>
        <p>
          {queue.positionInQueue === 1
            ? "Please wait while we create your book."
            : `You are in position ${queue.positionInQueue} in the queue.`}
        </p>
        {queue.positionInQueue !== 1 && (
          <button
            onClick={() => {
              if (isIdentityLoading || !identity) return;

              if (isFreePlan(identity.user.subscription?.plan))
                ws.emit("leaveSharedQueue");
              else ws.emit("leavePriorityQueue");

              console.log("Leave queue");
            }}
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
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          className="w-full p-2 bg-transparent border border-n-6/70 rounded-md outline-none focus:border-n-4 duration-300 ease-in-out font-light"
          placeholder="e.g. How to be healthy"
          required
        />
      </div>

      <div className="w-full flex flex-col gap-1">
        <label htmlFor="topic">Topic</label>
        <textarea
          id="topic"
          className="w-full min-h-16 p-2 bg-transparent border border-n-6/70 rounded-md outline-none focus:border-n-4 duration-300 ease-in-out font-light"
          placeholder={
            suggestions[secureRandomIndexes(suggestions, 1)[0]].content
          }
          required
        />
      </div>

      <div className="w-full flex flex-col gap-1">
        <label htmlFor="target-audience">Target Audience</label>
        <input
          type="text"
          id="target-audience"
          className="w-full p-2 bg-transparent border border-n-6/70 rounded-md outline-none focus:border-n-4 duration-300 ease-in-out font-light"
          placeholder="e.g. Adults, Teenagers"
        />
      </div>

      <ChaptersAndSections />

      <Cover />

      <div className="w-full mt-2">
        <button
          type="submit"
          className="w-full text-base bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg px-5 py-2.5 text-center transition-all duration-300 ease-in-out transform"
        >
          Create
        </button>
      </div>
    </form>
  );
};
