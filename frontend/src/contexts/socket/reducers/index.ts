// Constants
import { SET_USERS } from "../constants";
// Types
import { SocketAction } from "./types/socket-action";
import { SocketState } from "./types/socket-state";

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
    case SET_USERS:
      return {
        ...state,
        users: action.payload!,
      };
    default:
      return state;
  }
};
