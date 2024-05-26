// Dependencies
import { FC, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useGetIdentity } from "@refinedev/core";

// Contexts
import { SocketContext } from "@/contexts/socket";
import { SocketContext as ISocketContext } from "@/contexts/socket/interfaces/socket-context.interface";
// GraphQL Types
import { MeResponse } from "@/graphql/schema.types";
// Utils
import { isFreePlan } from "@/utils/isFreePlan";
import { numberToOrdinal } from "@/utils/numberToOrdinal";

/**
 * @description
 * The websocket connection.
 * It is used to emit and listen to events.
 * @type {Socket<ServerToClientEvents, ClientToServerEvents>}
 */
import { ws } from "@/sockets";

// Interfaces
interface QueueModalProps {}

/**
 * Queue Modal Component
 *
 * @interface QueueModalProps
 * @returns {JSX.Element} - QueueModal Component
 * @exports QueueModal
 */
export const QueueModal: FC<QueueModalProps> = (): JSX.Element => {
  /**
   * The state of the disconnection status.
   * It is used to determine if the user logged out while in the queue.
   * @type {boolean}
   */
  const [disconnected, setDisconnected] = useState<boolean>(false);

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
   * Leaves the queue based on the user's subscription plan.
   * If the user is on the free plan, leave the shared queue.
   * If the user is on the premium plan, leave the priority queue.
   * @returns {void}
   */
  const leaveQueue = (): void => {
    // If the identity is loading or not available, stop the leave queue action.
    if (isIdentityLoading || !identity) return;

    if (isFreePlan(identity.user.subscription?.plan))
      ws.emit("leaveSharedQueue");
    else ws.emit("leavePriorityQueue");
  };

  /**
   * Listen for the connection and disconnection events.
   * If the user disconnects while in the queue, set the disconnection status to true.
   * If the user reconnects, set the disconnection status to false.
   */
  useEffect(() => {
    ws.on("connect", () => setDisconnected(false));
    ws.on("disconnect", () => setDisconnected(true));
  }, []);

  // If the user is not in the queue, the identity is loading, or the user is disconnected, hide the queue modal.
  if (!queue.inQueue || !identity || disconnected) return <></>;

  return createPortal(
    <div className="z-[19] fixed bottom-16 md:bottom-5 right-2 md:right-5 w-full max-w-xs bg-n-7 p-2 rounded-lg border border-n-6/80 flex flex-col gap-2 justify-center items-center font-['Poppins']">
      <p className="text-sm">
        {queue.positionInQueue <= 1
          ? "Please wait while we create your book"
          : `You are ${numberToOrdinal(queue.positionInQueue)} in the queue...`}
      </p>

      <div className="w-full rounded-full h-2.5 bg-n-5 animate-pulse">
        <div
          className="bg-gradient-to-l from-purple-600 to-blue-500 h-2.5 rounded-full transition-all ease-in-out duration-300"
          style={{
            width:
              queue.positionInQueue <= 1
                ? "100%"
                : `${Number(
                    ((queue.size - queue.positionInQueue + 1) / queue.size) *
                      100
                  )}%`,
          }}
        ></div>
      </div>

      {queue.positionInQueue > 1 && (
        <span
          className="w-full text-transparent bg-gradient-to-br from-purple-600 hover:from-purple-600/80 to-blue-500 hover:to-blue-500/80 webkit-bg-clip-text inline-block text-sm tracking-wide cursor-pointer transition-all duration-300 ease-in-out text-center"
          onClick={leaveQueue}
        >
          Leave Queue
        </span>
      )}
    </div>,
    document.getElementById("portal") as HTMLDivElement
  );
};
