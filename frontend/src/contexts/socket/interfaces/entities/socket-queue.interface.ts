/**
 * Interface for the socket queue.
 *
 * @export
 * @interface SocketQueue
 * @property {number} size - The size of the queue.
 * @property {boolean} inQueue - The status of the user in the queue.
 * @property {number} positionInQueue - The position of the user in the queue.
 */
export interface SocketQueue {
  isChecking: boolean;
  size: number;
  inQueue: boolean;
  positionInQueue: number;
}
