/**
 * Interface for the queue status event.
 *
 * @export
 * @interface QueueStatusEvent
 * @property {("queued" | "alreadyInQueue" | "processed" | "checked" | "left")} status - The status of the user in the queue.
 * @property {string} userId - The user ID.
 * @property {number} [position] - The position of the user in the queue.
 */
export interface QueueStatusEvent {
  status: "queued" | "alreadyInQueue" | "processed" | "checked" | "left";
  userId: string;
  position?: number;
}
