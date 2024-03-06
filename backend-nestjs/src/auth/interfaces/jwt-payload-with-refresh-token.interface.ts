// Interfaces
import { JwtPayload } from './jwt-payload.interface';

/**
 * Represents the extended payload contained within a JWT, including a refresh token.
 *
 * @export
 * @interface JwtPayloadWithRefreshToken
 * @extends {JwtPayload} - The base JWT payload.
 * @property {string} refreshToken - The refresh token used to generate a new access token.
 * @module AuthModule
 */
export interface JwtPayloadWithRefreshToken extends JwtPayload {
  /**
   * The refresh token used to generate a new access token.
   * @type {string}
   */
  refreshToken: string;
}
