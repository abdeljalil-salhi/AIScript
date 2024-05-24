// Constants
import { SET_USERS } from "../constants";
// Types
import { SocketAction } from "../reducers/types/socket-action";
// Interfaces
import { SocketUser } from "../interfaces/socket-user.interface";

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
