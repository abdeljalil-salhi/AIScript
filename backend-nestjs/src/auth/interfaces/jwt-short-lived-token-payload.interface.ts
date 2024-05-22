/**
 * Interface for the short-lived JWT token payload.
 *
 * @export
 * @interface JwtShortLivedTokenPayload
 * @property {string} id - The user's ID.
 * @property {boolean} is2faEnabled - Whether or not 2FA is enabled for the user.
 * @property {boolean} isAdmin - Whether or not the user is an admin.
 * @module AuthModule
 */
export interface JwtShortLivedTokenPayload {
  /**
   * The user's ID.
   * @type {string}
   */
  id: string;

  /**
   * Whether or not 2FA is enabled for the user.
   * @type {boolean}
   */
  is2faEnabled: boolean;

  /**
   * Whether or not the user is an admin.
   * @type {boolean}
   */
  isAdmin: boolean;
}
