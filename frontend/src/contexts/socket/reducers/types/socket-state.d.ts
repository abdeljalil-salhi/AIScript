// Dependenices
import { Socket } from "socket.io-client";

// Types
import { SocketAction } from "./socket-action";
// Interfaces
import { ClientToServerEvents } from "../../interfaces/client-to-server-events.interface";
import { ServerToClientEvents } from "../../interfaces/server-to-client-events.interface";
import { SocketUser } from "../../interfaces/socket-user.interface";

/**
 * Type of the socket state.
 *
 * @export
 * @type {SocketState}
 * @property {Socket<ServerToClientEvents, ClientToServerEvents> | null} ws - The socket connection.
 * @property {SocketUser[]} users - The list of users.
 * @property {Dispatch<SocketAction>} dispatch - The dispatch function.
 */
export type SocketState = {
  ws: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  users: SocketUser[];
  dispatch: Dispatch<SocketAction>;
};
