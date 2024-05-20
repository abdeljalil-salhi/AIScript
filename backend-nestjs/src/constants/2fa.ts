/**
 * Interface for the two factor authentication configuration.
 *
 * @export
 * @interface
 * @module TwoFactorAuthenticationModule
 * @property {string} appName - The name of the application
 */
export interface TwoFactorAuthenticationConfig {
  appName: string;
}

/**
 * The two factor authentication configuration.
 *
 * @export
 * @constant
 * @type {TwoFactorAuthenticationConfig}
 * @module TwoFactorAuthenticationModule
 */
export const twoFactorAuthenticationConfig: TwoFactorAuthenticationConfig = {
  appName: process.env.TWO_FACTOR_AUTHENTICATION_APP_NAME,
};
