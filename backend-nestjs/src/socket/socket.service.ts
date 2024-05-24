// Dependencies
import { Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';

// Interfaces
import { SocketUser } from './interfaces/socket-user.interface';

/**
 * Service responsible for handling socket connections
 *
 * @export
 * @class SocketService
 */
@Injectable()
export class SocketService {
  /**
   * Creates an instance of the SocketService class.
   */
  constructor() {}

  /**
   * List of connected users;
   * It contains the user ID and the sockets associated with it.
   *
   * @private
   * @type {SocketUser[]}
   */
  private users: SocketUser[] = [];

  /**
   * Adds a user to the list of connected users.
   *
   * @param {Socket} socket - The user's socket
   * @param {string} userId - The user ID
   * @returns {string} - The user ID
   */
  public addUser(socket: Socket, userId: string): string {
    /**
     * @description
     * If the user is not already in the list of connected users, add them.
     * This is to prevent duplicate entries.
     * This can happen if the user has multiple tabs open, for example.
     * We don't want to add the user multiple times.
     */
    !this.users.some((user: SocketUser) => user.userId === userId) &&
      this.users.push({ userId, sockets: [] });

    /**
     * @description
     * Add the socket to the user's list of sockets.
     * This is useful for sending events to all the user's sockets.
     * For example, when sending a notification to the user.
     * This way, the user will receive the notification on all their devices.
     */
    this.users
      .find((user: SocketUser) => user.userId === userId)
      .sockets.push(socket);

    // Return the user ID
    return userId;
  }

  /**
   * Removes a user from the list of connected users.
   *
   * @param {string} socketId - The socket ID
   * @returns {string} - The user ID
   */
  public removeUser(socketId: string): string {
    // Find the user by the socket ID
    const user: SocketUser = this.users.find((user: SocketUser) =>
      user.sockets.some((socket: Socket) => socket.id === socketId),
    );
    if (!user) return;

    /**
     * Remove the socket from the user's list of sockets.
     */
    user.sockets = user.sockets.filter(
      (socket: Socket) => socket.id !== socketId,
    );

    /**
     * If the user has no more sockets, remove them from the list of connected users
     * to keep the list clean.
     */
    if (user.sockets.length === 0)
      this.users = this.users.filter(
        (connectedUser: SocketUser) => connectedUser.userId !== user.userId,
      );

    // Return the user ID
    return user.userId;
  }

  /**
   * Gets the user ID by the socket ID.
   *
   * @param {string} socketId - The socket ID
   * @returns {string} - The user ID
   */
  public getUserId(socketId: string): string {
    // Find the user by the socket ID
    const user: SocketUser = this.users.find((user: SocketUser) =>
      user.sockets.find((socket: Socket) => socket.id === socketId),
    );
    if (!user) return;

    // Return the user ID
    return user.userId;
  }

  /**
   * Gets the user's sockets IDs by the user ID.
   *
   * @param {string} userId - The user ID
   * @returns {Socket[]} - The user's sockets IDs
   */
  public getUserSocketIds(userId: string): string[] {
    // Find the user by the user ID
    const user: SocketUser = this.users.find(
      (user: SocketUser) => user.userId === userId,
    );
    if (!user) return;

    // Return the user's sockets IDs
    return user.sockets.map((socket: Socket) => socket.id);
  }

  /**
   * Gets the users IDs.
   *
   * @returns {string[]} - The users IDs
   */
  public getUserIds(): string[] {
    // Return the users IDs
    return this.users.map((user: SocketUser) => user.userId);
  }

  /**
   * Gets the socket IDs.
   *
   * @returns {string[]} - The socket IDs
   */
  public getSocketIds(): string[] {
    /**
     * @description
     * Reduce the list of connected users to a list of socket IDs.
     * This is useful for broadcasting events.
     * For example, when sending a notification to all connected users.
     * This way, all users will receive the notification.
     */
    return this.users.reduce(
      (socketIds: string[], user: SocketUser) => [
        ...socketIds,
        ...user.sockets.map((socket: Socket) => socket.id),
      ],
      [],
    );
  }
}
