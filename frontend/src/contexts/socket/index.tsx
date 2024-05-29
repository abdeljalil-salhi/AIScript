// Dependencies
import { FC, ReactNode, createContext, useEffect, useReducer } from "react";
import { useGetIdentity, useNotification } from "@refinedev/core";

// Types
import { SocketState } from "./reducers/types/socket-state";
import { SocketAction } from "./reducers/types/socket-action";
// Interfaces
import { SocketContext as ISocketContext } from "./interfaces/socket-context.interface";
// Entities Interfaces
import { BookData } from "./interfaces/entities/book-data.interface";
import { SocketUser } from "./interfaces/entities/socket-user.interface";
// Events Interfaces
import { QueueEvent } from "./interfaces/events/queue.event.interface";
import { QueueStatusEvent } from "./interfaces/events/queue-status.event.interface";
import { WalletErrorEvent } from "./interfaces/events/wallet-error.event.interface";
// Actions
import { setQueue, setQueueStatus, setUserId, setUsers } from "./actions";
// Reducers
import { SocketReducer } from "./reducers";
// GraphQL Types
import { MeResponse } from "@/graphql/schema.types";
// Utils
import { isFreePlan } from "@/utils/isFreePlan";

// Interfaces
interface SocketContextProps {
  children: ReactNode;
}

/**
 * @description
 * The websocket connection.
 * It is initialized with the URL of the websocket server.
 * The connection is not established automatically, but it is configured to upgrade from HTTP to WebSocket.
 * If the websocket transport is not supported, the connection reverts to classic polling.
 */
import { ws } from "@/sockets";
/**
 * @description
 * The initial state of the socket context.
 * It contains the socket connection, the user ID, the list of users, the queue, and the dispatch function.
 */
import { socketInitialState } from "./initialState";

const INITIAL_STATE: ISocketContext = socketInitialState;

/**
 * The socket context.
 * It contains the socket connection, the user ID, the list of users, the queue, and the dispatch function.
 */
export const SocketContext = createContext<ISocketContext>(INITIAL_STATE);

/**
 * The socket context provider.
 * It provides the socket context to the children components.
 *
 * @interface SocketContextProps
 * @returns {JSX.Element} - SocketContextProvider Component
 * @exports SocketContextProvider
 */
export const SocketContextProvider: FC<SocketContextProps> = ({
  children,
}): JSX.Element => {
  /**
   * The state of the socket context.
   * It contains the socket connection, the list of users, and the dispatch function.
   */
  const [state, dispatch] = useReducer<
    (state: SocketState, action: SocketAction) => SocketState
  >(SocketReducer, INITIAL_STATE);

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
   * Hook to listen for the users event from the server.
   * The users event is emitted by the server when the list of users changes.
   * The list of users is then updated in the socket context.
   */
  useEffect(() => {
    // Listen for the users event from the server
    ws.on("users", (users: SocketUser[]) => {
      dispatch(setUsers(users));
    });

    // If the identity is not available, prevent the users event listener
    if (isIdentityLoading || !identity) return;

    // Set the user's id in the state
    dispatch(setUserId(identity.user.id));

    // If the user is on the free plan, listen for the shared queue events
    if (isFreePlan(identity.user.subscription?.plan)) {
      ws.on("sharedQueue", ({ size }: QueueEvent) => {
        dispatch(setQueue({ size }));
      });
      ws.on("sharedQueueStatus", (payload: QueueStatusEvent) => {
        dispatch(setQueueStatus(payload));
      });
    }
    // Otherwise, listen for the priority queue events
    else {
      ws.on("priorityQueue", ({ size }: QueueEvent) => {
        dispatch(setQueue({ size }));
      });
      ws.on("priorityQueueStatus", (payload: QueueStatusEvent) => {
        dispatch(setQueueStatus(payload));
      });
    }

    // Listen for the book created event and show a success notification
    ws.on("bookCreated", (data: BookData) => {
      open?.({
        type: "success",
        description: "Book created successfully",
        message: `Your book '${data.title}' has been created successfully!`,
        key: "book-created",
      });
    });

    // Listen for the book error event and show an error notification
    ws.on("bookError", (title: string) => {
      open?.({
        type: "error",
        description: "Book creation failed",
        message: `An error occurred while creating the book '${title}'. No credits were deducted. Please try again.`,
        key: "book-error",
      });
    });

    ws.on("walletError", ({ status, reason }: WalletErrorEvent) => {
      open?.({
        type: "error",
        description: "Unable to create book",
        message: reason,
        key: status,
      });
    });
  }, [identity, isIdentityLoading, open]);

  /**
   * Hook to connect the websocket when the identity is loaded;
   * The websocket is connected with the user's access token.
   * The user's id is also sent to the server for identification.
   * If the user is not authenticated, the websocket is not connected.
   */
  useEffect(() => {
    // If the identity is loading or the identity is not available, prevent the websocket connection
    if (isIdentityLoading || !identity) return;

    // Get the user from the identity
    const user = identity?.user;

    // Set the authorization headers
    ws.auth = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      userId: user.id,
    };

    // Connect the websocket
    if (user) ws.connect();

    // Check if the user is in queue
    if (isFreePlan(user.subscription?.plan)) ws.emit("checkSharedQueue");
    else ws.emit("checkPriorityQueue");
  }, [identity, identity?.user, isIdentityLoading]);

  return (
    <SocketContext.Provider
      value={{
        ws,
        userId: state.userId,
        users: state.users,
        queue: state.queue,
        dispatch,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
