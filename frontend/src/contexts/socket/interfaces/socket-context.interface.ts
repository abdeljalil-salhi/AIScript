// Dependencies
import { Dispatch } from "react";
import { Socket } from "socket.io-client";

// Interfaces
import { ClientToServerEvents } from "./client-to-server-events.interface";
import { ServerToClientEvents } from "./server-to-client-events.interface";
// Entities Interfaces
import { SocketUser } from "./entities/socket-user.interface";
import { SocketQueue } from "./entities/socket-queue.interface";
// Types
import { SocketAction } from "../reducers/types/socket-action";

/**
 * Interface of the socket context.
 *
 * @export
 * @interface SocketContext
 * @property {Socket<ServerToClientEvents, ClientToServerEvents> | null} ws - The socket connection.
 * @property {string | null} userId - The user ID.
 * @property {SocketUser[]} users - The list of users.
 * @property {SocketQueue} queue - The queue.
 * @property {Dispatch<SocketAction>} dispatch - The dispatch function.
 */
export interface SocketContext {
  ws: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  userId: string | null;
  users: SocketUser[];
  queue: SocketQueue;
  dispatch: Dispatch<SocketAction>;
}
