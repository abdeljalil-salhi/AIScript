// Constants
import {
  SET_QUEUE_SIZE,
  SET_QUEUE_STATUS,
  SET_USERS,
  SET_USER_ID,
} from "../constants";
// Types
import { SocketAction } from "./types/socket-action";
import { SocketState } from "./types/socket-state";
// Entities Interfaces
import { SocketUser } from "../interfaces/entities/socket-user.interface";
import { QueueEvent } from "../interfaces/events/queue.event.interface";
import { QueueStatusEvent } from "../interfaces/events/queue-status.event.interface";

/**
 * Reducer for the socket context
 *
 * @param {SocketState} state - The current state.
 * @param {SocketAction} action - The action to perform.
 * @returns {SocketState} The new state.
 */
export const SocketReducer = (
  state: SocketState,
  action: SocketAction
): SocketState => {
  switch (action.type) {
    case SET_USER_ID:
      return {
        ...state,
        userId: action.payload as string,
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload as SocketUser[],
      };
    case SET_QUEUE_SIZE:
      return {
        ...state,
        queue: {
          ...state.queue,
          size: (action.payload as QueueEvent).size,
        },
      };
    case SET_QUEUE_STATUS:
      if (
        (action.payload as QueueStatusEvent).status === "checked" &&
        (action.payload as QueueStatusEvent).userId === state.userId
      ) {
        const inQueue: boolean =
          (action.payload as QueueStatusEvent).position! !== -1;
        return {
          ...state,
          queue: {
            ...state.queue,
            isChecking: false,
            inQueue,
            positionInQueue: inQueue
              ? (action.payload as QueueStatusEvent).position!
              : 0,
          },
        };
      } else if (
        (action.payload as QueueStatusEvent).status === "queued" &&
        (action.payload as QueueStatusEvent).userId === state.userId
      )
        return {
          ...state,
          queue: {
            ...state.queue,
            inQueue: true,
            positionInQueue: (action.payload as QueueStatusEvent).position!,
          },
        };
      else if (
        (action.payload as QueueStatusEvent).status === "left" &&
        (action.payload as QueueStatusEvent).userId === state.userId
      )
        return {
          ...state,
          queue: {
            ...state.queue,
            inQueue: false,
            positionInQueue: 0,
          },
        };
      else if (
        (action.payload as QueueStatusEvent).status === "processed" &&
        (action.payload as QueueStatusEvent).userId === state.userId
      )
        return {
          ...state,
          queue: {
            ...state.queue,
            inQueue: false,
            positionInQueue: 0,
          },
        };
      else if (
        (action.payload as QueueStatusEvent).status === "processed" &&
        (action.payload as QueueStatusEvent).userId !== state.userId &&
        state.queue.inQueue
      )
        return {
          ...state,
          queue: {
            ...state.queue,
            positionInQueue: state.queue.positionInQueue - 1,
          },
        };
      return state;
    default:
      return state;
  }
};
