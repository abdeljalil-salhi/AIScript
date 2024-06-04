/**
 * The GoogleUser interface represents the Google account information.
 *
 * @export
 * @interface GoogleUser
 * @property {string} provider - The provider of the Google account.
 * @property {string} email - The email of the Google account.
 * @property {string} name - The name of the Google account.
 * @property {string} avatar - The avatar of the Google account.
 * @module AuthModule
 */
export interface GoogleUser {
  /**
   * The provider of the Google account.
   * @type {string}
   */
  provider: string;

  /**
   * The email of the Google account.
   * @type {string}
   */
  email: string;

  /**
   * The name of the Google account.
   * @type {string}
   */
  name: string;

  /**
   * The avatar of the Google account.
   * @type {string}
   */
  avatar: string;
}
