// Dependencies
import { Socket } from 'socket.io';

/**
 * Type of the SocketIO middleware function.
 *
 * @export
 * @type {SocketIOMiddleware}
 */
export type SocketIOMiddleware = {
  (client: Socket, next: (err?: Error) => void): void;
};
