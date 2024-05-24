// Types
import { SocketAction } from "./reducers/types/socket-action";
// Interfaces
import { SocketContext } from "./interfaces/socket-context.interface";

/**
 * The initial state of the socket context.
 *
 * @export
 * @type {SocketContext}
 * @property {Socket<ServerToClientEvents, ClientToServerEvents> | null} ws - The socket connection.
 * @property {SocketUser[]} users - The list of users.
 * @property {Dispatch<SocketAction>} dispatch - The dispatch function.
 */
export const socketInitialState: SocketContext = {
  ws: null,
  users: [],
  dispatch: (_: SocketAction) => {
    _;
  },
};
