// Interfaces
import { SocketUser } from "./socket-user.interface";

/**
 * Interface of the server to client events.
 *
 * @export
 * @interface ServerToClientEvents
 * @property {(users: SocketUser[]): void} users - The event to get the list of online users.
 */
export interface ServerToClientEvents {
  users: (users: SocketUser[]) => void;
}
