// Dependencies
import { FC, useContext } from "react";
import { createPortal } from "react-dom";
import { useGetIdentity } from "@refinedev/core";

// Contexts
import { SocketContext } from "@/contexts/socket";
import { SocketContext as ISocketContext } from "@/contexts/socket/interfaces/socket-context.interface";
// GraphQL Types
import { MeResponse } from "@/graphql/schema.types";
import { numberToOrdinal } from "@/utils/numberToOrdinal";
import { ws } from "@/sockets";
import { isFreePlan } from "@/utils/isFreePlan";

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
   * Use the socket context to get the queue informations.
   */
  const { queue } = useContext<ISocketContext>(SocketContext);

  /**
   * Get the user's identity
   * @type {MeResponse}
   */
  const { data: identity, isLoading: isIdentityLoading } =
    useGetIdentity<MeResponse>();

  const leaveQueue = (): void => {
    if (isIdentityLoading || !identity) return;

    if (isFreePlan(identity.user.subscription?.plan))
      ws.emit("leaveSharedQueue");
    else ws.emit("leavePriorityQueue");
  };

  if (!queue.inQueue || !identity) return <></>;

  return createPortal(
    <div className="z-[19] fixed bottom-16 md:bottom-5 right-2 md:right-5 w-full max-w-xs bg-n-7 p-2 rounded-lg border border-n-6/80 flex flex-col gap-2 justify-center items-center font-['Poppins']">
      <p className="text-sm">
        {queue.positionInQueue === 1
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

      <span
        className="w-full text-transparent bg-gradient-to-br from-purple-600 hover:from-purple-600/80 to-blue-500 hover:to-blue-500/80 webkit-bg-clip-text inline-block text-sm tracking-wide cursor-pointer transition-all duration-300 ease-in-out text-center"
        onClick={leaveQueue}
      >
        Leave Queue
      </span>
    </div>,
    document.getElementById("portal") as HTMLDivElement
  );
};
