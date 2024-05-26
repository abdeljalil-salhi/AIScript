// Interfaces
import { BookData } from "./entities/book-data.interface";

/**
 * Interface for the client to server events.
 *
 * @export
 * @interface ClientToServerEvents
 * @property {(data: BookData): void} joinSharedQueue - The event to join the shared queue.
 * @property {(data: BookData): void} joinPriorityQueue - The event to join the priority queue.
 * @property {(): void} checkSharedQueue - The event to check if the user is in the shared queue.
 * @property {(): void} checkPriorityQueue - The event to check if the user is in the priority queue.
 * @property {(): void} leaveSharedQueue - The event to leave the shared queue.
 * @property {(): void} leavePriorityQueue - The event to leave the priority queue.
 */
export interface ClientToServerEvents {
  joinSharedQueue: (data: BookData) => void;
  joinPriorityQueue: (data: BookData) => void;
  checkSharedQueue: () => void;
  checkPriorityQueue: () => void;
  leaveSharedQueue: () => void;
  leavePriorityQueue: () => void;
}
