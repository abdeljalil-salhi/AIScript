// Constants
import {
  SET_QUEUE_SIZE,
  SET_QUEUE_STATUS,
  SET_USERS,
  SET_USER_ID,
} from "../constants";
// Types
import { SocketAction } from "../reducers/types/socket-action";
// Entities Interfaces
import { SocketUser } from "../interfaces/entities/socket-user.interface";
// Events Interfaces
import { QueueEvent } from "../interfaces/events/queue.event.interface";
import { QueueStatusEvent } from "../interfaces/events/queue-status.event.interface";

/**
 * Action to set the user ID.
 *
 * @param {string} userId - The user ID.
 * @returns {SocketAction} The action to perform.
 */
export const setUserId = (userId: string): SocketAction => ({
  type: SET_USER_ID,
  payload: userId,
});

/**
 * Action to set the list of users.
 *
 * @param {SocketUser[]} users - The list of users.
 * @returns {SocketAction} The action to perform.
 */
export const setUsers = (users: SocketUser[]): SocketAction => ({
  type: SET_USERS,
  payload: users,
});

/**
 * Action to set the queue size.
 *
 * @param {QueueEvent} queue - The queue event.
 * @returns {SocketAction} The action to perform.
 */
export const setQueue = (queue: QueueEvent): SocketAction => ({
  type: SET_QUEUE_SIZE,
  payload: queue,
});

/**
 * Action to set the queue status.
 *
 * @param {QueueStatusEvent} queueStatus - The queue status event.
 * @returns {SocketAction} The action to perform.
 */
export const setQueueStatus = (
  queueStatus: QueueStatusEvent
): SocketAction => ({
  type: SET_QUEUE_STATUS,
  payload: queueStatus,
});
