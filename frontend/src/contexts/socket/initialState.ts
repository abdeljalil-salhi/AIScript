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
 * @property {string | null} userId - The user ID.
 * @property {SocketUser[]} users - The list of users.
 * @property {SocketQueue} queue - The queue.
 * @property {Dispatch<SocketAction>} dispatch - The dispatch function.
 */
export const socketInitialState: SocketContext = {
  ws: null,
  userId: null,
  users: [],
  queue: {
    isChecking: true,
    size: 0,
    inQueue: false,
    positionInQueue: 0,
  },
  dispatch: (_: SocketAction) => {
    _;
  },
};
