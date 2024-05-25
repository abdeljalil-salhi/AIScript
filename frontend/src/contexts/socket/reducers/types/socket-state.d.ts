// Dependenices
import { Socket } from "socket.io-client";

// Types
import { SocketAction } from "./socket-action";
// Interfaces
import { ClientToServerEvents } from "../../interfaces/client-to-server-events.interface";
import { ServerToClientEvents } from "../../interfaces/server-to-client-events.interface";
// Entities Interfaces
import { SocketUser } from "../../interfaces/entities/socket-user.interface";
import { SocketQueue } from "../../interfaces/entities/socket-queue.interface";

/**
 * Type of the socket state.
 *
 * @export
 * @type {SocketState}
 * @property {string | null} userId - The user ID.
 * @property {Socket<ServerToClientEvents, ClientToServerEvents> | null} ws - The socket connection.
 * @property {SocketUser[]} users - The list of users.
 * @property {SocketQueue} queue - The queue.
 * @property {Dispatch<SocketAction>} dispatch - The dispatch function.
 */
export type SocketState = {
  userId: string | null;
  ws: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  users: SocketUser[];
  queue: SocketQueue;
  dispatch: Dispatch<SocketAction>;
};
