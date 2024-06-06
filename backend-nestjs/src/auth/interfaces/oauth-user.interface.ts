/**
 * The OAuthUser interface represents the structure of the OAuth account.
 *
 * @export
 * @interface OAuthUser
 * @property {('google' | 'xtwitter')} provider - The provider of the OAuth account.
 * @property {string} email - The email of the OAuth account.
 * @property {string} name - The name of the OAuth account.
 * @property {string} avatar - The avatar of the OAuth account.
 * @module AuthModule
 */
export interface OAuthUser {
  /**
   * The provider of the OAuth account.
   * @type {('google' | 'xtwitter')}
   */
  provider: 'google' | 'xtwitter';

  /**
   * The email of the OAuth account.
   * @type {string}
   */
  email: string;

  /**
   * The name of the OAuth account.
   * @type {string}
   */
  name: string;

  /**
   * The avatar of the OAuth account.
   * @type {string}
   */
  avatar: string;
}
