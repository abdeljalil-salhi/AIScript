// Dependencies
import { FC, ReactNode, createContext, useEffect, useReducer } from "react";
import { useGetIdentity } from "@refinedev/core";

// Types
import { SocketState } from "./reducers/types/socket-state";
import { SocketAction } from "./reducers/types/socket-action";
// Interfaces
import { SocketContext as ISocketContext } from "./interfaces/socket-context.interface";
import { SocketUser } from "./interfaces/socket-user.interface";
// Actions
import { setUsers } from "./actions";
// Reducers
import { SocketReducer } from "./reducers";
// GraphQL Types
import { MeResponse } from "@/graphql/schema.types";

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
 * It contains the socket connection, the list of users, and the dispatch function.
 */
import { socketInitialState } from "./initialState";

const INITIAL_STATE: ISocketContext = socketInitialState;

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
    ws.on("users", (users: SocketUser[]) => {
      dispatch(setUsers(users));
    });
  }, []);

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
  }, [identity, identity?.user, isIdentityLoading]);

  return (
    <SocketContext.Provider
      value={{
        ws,
        users: state.users,
        dispatch,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
