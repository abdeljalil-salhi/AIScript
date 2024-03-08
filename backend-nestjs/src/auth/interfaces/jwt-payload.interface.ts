/**
 * Interface for the JWT payload.
 *
 * @export
 * @interface JwtPayload
 * @property {string} id - The user's ID.
 * @property {string} email - The user's email.
 * @property {boolean} is2faEnabled - Whether or not 2FA is enabled for the user.
 * @property {boolean} is2faAuthenticated - Whether or not 2FA is authenticated for the user.
 * @property {boolean} isAdmin - Whether or not the user is an admin.
 * @module AuthModule
 */
export interface JwtPayload {
  /**
   * The user's ID.
   * @type {string}
   */
  id: string;

  /**
   * The user's email.
   * @type {string}
   */
  email: string;

  /**
   * Whether or not 2FA is enabled for the user.
   * @type {boolean}
   */
  is2faEnabled: boolean;

  /**
   * Whether or not 2FA is authenticated for the user.
   * @type {boolean}
   */
  is2faAuthenticated: boolean;

  /**
   * Whether or not the user is an admin.
   * @type {boolean}
   */
  isAdmin: boolean;
}
