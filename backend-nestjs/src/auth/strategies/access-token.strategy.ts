// Dependencies
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

// Interfaces
import { JwtPayload } from '../interfaces/jwt-payload.interface';

/**
 * The strategy that handles the validation of access tokens.
 *
 * @export
 * @class AccessToken
 * @extends {PassportStrategy(Strategy, 'jwt')}
 * @module AuthModule
 */
@Injectable()
export class AccessToken extends PassportStrategy(Strategy, 'jwt') {
  /**
   * Creates an instance of the AccessToken strategy.
   */
  constructor() {
    super({
      // Extracts the access token from the authorization header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // Whether expired access tokens should be allowed
      ignoreExpiration: false,

      // Secret key to verify the signature of the access token
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
    });
  }

  /**
   * Validates the payload extracted from the access token.
   *
   * @param {JwtPayload} payload - The payload extracted from the access token.
   * @returns {Promise<JwtPayload>} - The validated payload.
   */
  public async validate(payload: JwtPayload): Promise<JwtPayload> {
    // If 2FA is enabled and not authenticated, throw a 403 Forbidden error
    if (payload.is2faEnabled && !payload.is2faAuthenticated)
      throw new ForbiddenException('2FA is required for this user.');

    // Return the validated payload if no errors occurred
    return payload;
  }
}
