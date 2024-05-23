// Dependencies
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

// Interfaces
import { JwtShortLivedTokenPayload } from '../interfaces/jwt-short-lived-token-payload.interface';

/**
 * The strategy that handles the validation of short-lived tokens.
 *
 * @export
 * @class ShortLivedTokenStrategy
 * @extends {PassportStrategy(Strategy, 'jwt-short-lived')}
 * @module AuthModule
 */
@Injectable()
export class ShortLivedTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-short-lived',
) {
  /**
   * Creates an instance of the ShortLivedToken strategy.
   */
  constructor() {
    super({
      // Extracts the short-lived token from the authorization header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // Whether expired short-lived tokens should be allowed
      ignoreExpiration: false,

      // Secret key to verify the signature of the short-lived token
      secretOrKey: process.env.JWT_SHORT_LIVED_TOKEN_SECRET,
    });
  }

  /**
   * Validates the payload extracted from the short-lived token.
   *
   * @param {JwtShortLivedTokenPayload} payload - The payload extracted from the short-lived token.
   * @returns {Promise<JwtShortLivedTokenPayload>} - The validated payload.
   */
  public async validate(
    payload: JwtShortLivedTokenPayload,
  ): Promise<JwtShortLivedTokenPayload> {
    // If 2FA is not enabled, throw a 403 Forbidden error
    if (!payload.is2faEnabled)
      throw new ForbiddenException(
        'Two-factor authentication is not enabled for this user.',
      );

    // Return the validated payload if no errors occurred
    return payload;
  }
}
