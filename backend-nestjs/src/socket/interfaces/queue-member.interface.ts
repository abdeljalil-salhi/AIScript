// Dependencies
import { Socket } from 'socket.io';

// Interfaces
import { BookData } from './book-data.interface';
// Entities
import { Wallet } from 'src/wallet/entities/wallet.entity';

/**
 * Interface of the queue member.
 *
 * @export
 * @interface QueueMember
 * @property {string} instanceId - The instance ID.
 * @property {Socket} client - The socket client.
 * @property {string} userId - The user ID.
 * @property {BookData} data - The book data.
 * @property {Wallet} wallet - The user's wallet entity.
 * @property {number} price - The price of the book.
 */
export interface QueueMember {
  instanceId: string;
  client: Socket;
  userId: string;
  data: BookData;
  wallet: Wallet;
  price: number;
}
