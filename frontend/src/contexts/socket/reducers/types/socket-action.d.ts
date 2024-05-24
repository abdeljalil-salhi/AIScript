// Interfaces
import { SocketUser } from "../../interfaces/socket-user.interface";

/**
 * Type of the socket action.
 *
 * @export
 * @type {SocketAction}
 * @property {string} type - The type of the action.
 * @property {SocketUser[]} [payload] - The payload of the action.
 *
 * @example
 * {
 *  type: "SET_USERS",
 *  payload: [
 *   {
 *    userId: "6b6f6b6f-6b6f-6b6f-6b6f-6b6f6b6f6b6f",
 *    socketId: "6b6f6b6f-6b6f-6b6f-6b6f-6b6f6b6f6b6f",
 *   },
 *  ],
 * }
 */
export type SocketAction = {
  type: string;
  payload?: SocketUser[];
};
