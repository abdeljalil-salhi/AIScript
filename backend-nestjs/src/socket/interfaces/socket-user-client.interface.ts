/**
 * Interface for the socket user client.
 *
 * @export
 * @interface SocketUserClient
 * @property {string} userId - The user ID
 * @property {string[]} socketIds - The user's socket IDs
 */
export interface SocketUserClient {
  userId: string;
  socketIds: string[];
}
