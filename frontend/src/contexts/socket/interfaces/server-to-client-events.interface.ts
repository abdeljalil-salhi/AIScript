// Entities Interfaces
import { SocketUser } from "./entities/socket-user.interface";
// Events Interfaces
import { QueueEvent } from "./events/queue.event.interface";
import { QueueStatusEvent } from "./events/queue-status.event.interface";

/**
 * Interface of the server to client events.
 *
 * @export
 * @interface ServerToClientEvents
 * @property {(users: SocketUser[]): void} users - The event to get the list of online users.
 * @property {({ size }: QueueEvent): void} sharedQueue - The event to get the shared queue size.
 * @property {({ size }: QueueEvent): void} priorityQueue - The event to get the priority queue size.
 * @property {({ status, userId, position }: QueueStatusEvent): void} sharedQueueStatus - The event to get the shared queue status.
 * @property {({ status, userId, position }: QueueStatusEvent): void} priorityQueueStatus - The event to get the priority queue status.
 */
export interface ServerToClientEvents {
  users: (users: SocketUser[]) => void;
  sharedQueue: ({ size }: QueueEvent) => void;
  priorityQueue: ({ size }: QueueEvent) => void;
  sharedQueueStatus: ({ status, userId, position }: QueueStatusEvent) => void;
  priorityQueueStatus: ({ status, userId, position }: QueueStatusEvent) => void;
}
