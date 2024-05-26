// Events interfaces
import { QueueEvent } from "../../interfaces/events/queue.event.interface";
import { QueueStatusEvent } from "../../interfaces/events/queue-status.event.interface";
// Entities interfaces
import { SocketUser } from "../../interfaces/entities/socket-user.interface";

/**
 * Type of the events socket action payload.
 */
type Events = QueueEvent | QueueStatusEvent;

/**
 * Type of the entities socket action payload.
 */
type Entities = SocketUser[];

/**
 * Type of the socket action payload.
 */
export type SocketActionPayload = Events | Entities | string;
