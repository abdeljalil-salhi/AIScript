// Dependencies
import { Dispatch } from "react";
import { Socket } from "socket.io-client";

// Interfaces
import { ClientToServerEvents } from "./client-to-server-events.interface";
import { ServerToClientEvents } from "./server-to-client-events.interface";
import { SocketUser } from "./socket-user.interface";
// Types
import { SocketAction } from "../reducers/types/socket-action";

/**
 * Interface of the socket context.
 *
 * @export
 * @interface SocketContext
 * @property {Socket<ServerToClientEvents, ClientToServerEvents> | null} ws - The socket connection.
 * @property {SocketUser[]} users - The list of users.
 * @property {Dispatch<SocketAction>} dispatch - The dispatch function.
 */
export interface SocketContext {
  ws: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  users: SocketUser[];
  dispatch: Dispatch<SocketAction>;
}
