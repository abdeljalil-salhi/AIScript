/**
 * Represents the two-factor authentication secret with URI.
 *
 * @export
 * @interface TwoFactorAuthenticationSecretWithUri
 * @property {string} secret - The two-factor authentication secret.
 * @property {string} otpAuthUri - The two-factor authentication URI.
 * @module TwoFactorAuthenticationModule
 */
export interface TwoFactorAuthenticationSecretWithUri {
  /**
   * The two-factor authentication secret.
   * @type {string}
   */
  secret: string;

  /**
   * The two-factor authentication URI.
   * @type {string}
   */
  otpAuthUri: string;
}
