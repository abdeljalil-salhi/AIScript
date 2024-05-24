// Dependencies
import { Socket } from 'socket.io';

/**
 * Interface for the socket user.
 *
 * @export
 * @interface SocketUser
 * @property {string} userId - The user ID
 * @property {Socket[]} sockets - The user's sockets
 */
export interface SocketUser {
  userId: string;
  sockets: Socket[];
}
