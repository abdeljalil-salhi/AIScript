/**
 * Interface for the client to server events.
 *
 * @export
 * @interface ClientToServerEvents
 * @property {(): void} joinSharedQueue - The event to join the shared queue.
 * @property {(): void} joinPriorityQueue - The event to join the priority queue.
 * @property {(): void} checkSharedQueue - The event to check if the user is in the shared queue.
 * @property {(): void} checkPriorityQueue - The event to check if the user is in the priority queue.
 * @property {(): void} leaveSharedQueue - The event to leave the shared queue.
 * @property {(): void} leavePriorityQueue - The event to leave the priority queue.
 */
export interface ClientToServerEvents {
  joinSharedQueue: () => void;
  joinPriorityQueue: () => void;
  checkSharedQueue: () => void;
  checkPriorityQueue: () => void;
  leaveSharedQueue: () => void;
  leavePriorityQueue: () => void;
}
