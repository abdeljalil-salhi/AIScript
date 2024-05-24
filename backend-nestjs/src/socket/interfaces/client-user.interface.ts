// Dependencies
import { Socket } from 'socket.io';

/**
 * Interface of the queue member.
 *
 * @export
 * @interface QueueMember
 * @property {string} instanceId - The instance ID.
 * @property {Socket} client - The socket client.
 * @property {string} userId - The user ID.
 */
export interface QueueMember {
  instanceId: string;
  client: Socket;
  userId: string;
}
