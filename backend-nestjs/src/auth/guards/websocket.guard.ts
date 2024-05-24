// Dependencies
import { Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

// Interfaces
import { JwtPayload } from '../interfaces/jwt-payload.interface';

// Constants
const DEV = process.env.NODE_ENV === 'development';

/**
 * Retrieves the client handshake.
 * The handshake is retrieved from the client auth object, the client query object, or the client headers object.
 * The handshake is retrieved in that order of precedence.
 * If the process is not running in development mode, the handshake is only retrieved from the client auth object.
 *
 * @export
 * @param {Socket} client - The client socket.
 * @param {string} key - The key to retrieve from the client handshake.
 * @returns {string} - The value of the key in the client handshake.
 */
export const getClientHandshake = (client: Socket, key: string): string => {
  if (!DEV) return client.handshake.auth[key];

  return (
    client.handshake.auth[key] ||
    client.handshake.query[key] ||
    client.handshake.headers[key]
  );
};

/**
 * Guard to protect websockets by checking the validity of the access token.
 *
 * @export
 * @class WebsocketGuard
 * @implements {CanActivate}
 */
@Injectable()
export class WebsocketGuard implements CanActivate {
  /**
   * Checks if the access token is valid.
   * If the process is running in debug mode, the check is skipped.
   *
   * @param {ExecutionContext} context - Execution context.
   * @returns {(boolean | Promise<boolean> | Observable<boolean>)} - A boolean indicating whether access should be granted.
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() !== 'ws' || DEV) return true;

    // Retrieve the client socket
    const client: Socket = context.switchToWs().getClient();

    // Validate the access token retrieved from the client
    WebsocketGuard.validateToken(client);

    return true;
  }

  /**
   * Validates the access token; checks if the token is valid.
   * If the token is valid, the payload is returned.
   * If the token is invalid, an error is thrown.
   *
   * @static
   * @param {Socket} client - The client socket.
   * @returns {(string | JwtPayload)} - The payload of the access token.
   * @throws {Error} - An error is thrown if the authorization header is missing.
   * @throws {Error} - An error is thrown if the userId is missing.
   * @throws {Error} - An error is thrown if the token is invalid.
   */
  static validateToken(client: Socket): string | JwtPayload {
    /**
     * @description
     * Retrieve the authorization header from the client handshake.
     * If the header is not present, retrieve the authorization header from the client auth object.
     * If the header is not present, throw an error.
     *
     * @type {Client SocketIO} - the token is retrieved from the authorization header in the client handshake.
     * @type {Postman SocketIO} - the token is retrieved from the authorization header in the client auth object.
     */
    const authorization: string = getClientHandshake(client, 'authorization');

    if (!authorization) throw new Error('Missing authorization header');

    const userId: string = getClientHandshake(client, 'userId');

    if (!userId) throw new Error('Missing userId');

    const token: string = authorization.split(' ')[1];
    if (!token || token.length === 0) throw new Error('Missing token');

    const payload: string | JwtPayload = verify(
      token,
      process.env.JWT_ACCESS_TOKEN_SECRET,
    ) as string;

    return payload;
  }
}
