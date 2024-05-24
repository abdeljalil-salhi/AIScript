// Dependencies
import { Socket } from 'socket.io';

// Guards
import { WebsocketGuard } from '../guards/websocket.guard';

/**
 * Type of the SocketIO middleware function.
 *
 * @export
 * @type {SocketIOMiddleware}
 */
export type SocketIOMiddleware = {
  (client: Socket, next: (err?: Error) => void): void;
};

/**
 * Middleware to protect websockets by checking the validity of the access token.
 *
 * @export
 * @returns {SocketIOMiddleware} - The SocketIO middleware.
 */
export const WebsocketMiddleware = (): SocketIOMiddleware => {
  return (client: Socket, next: (err?: Error) => void) => {
    try {
      WebsocketGuard.validateToken(client);
      next();
    } catch (e) {
      next(e);
    }
  };
};
