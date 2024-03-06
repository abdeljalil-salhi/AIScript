// Dependencies
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

// Interfaces
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { JwtPayloadWithRefreshToken } from '../interfaces/jwt-payload-with-refresh-token.interface';

/**
 * The strategy that validates refresh tokens for authentication.
 *
 * @export
 * @class RefreshTokenStrategy
 * @extends {PassportStrategy(Strategy, 'jwt-refresh')}
 * @module AuthModule
 */
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  /**
   * Creates an instance of the RefreshToken strategy.
   */
  constructor() {
    super({
      // Extracts the refresh token from the authorization header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // Whether expired refresh tokens should be allowed
      ignoreExpiration: false,

      // Secret key to verify the signature of the refresh token
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,

      // Pass the request object to the validate function
      passReqToCallback: true,
    });
  }

  /**
   * Validates the payload extracted from the refresh token.
   *
   * @param {Request} req - The request object.
   * @param {JwtPayload} payload - The payload extracted from the refresh token.
   * @returns {Promise<JwtPayloadWithRefreshToken>} - The validated payload with the refresh token.
   */
  public async validate(
    req: Request,
    payload: JwtPayload,
  ): Promise<JwtPayloadWithRefreshToken> {
    // Extract the refresh token from the authorization header
    const refreshToken: string = req
      ?.get('authorization')
      ?.replace('Bearer', '')
      .trim();

    // Return the validated payload with the refresh token if no errors occurred
    return { ...payload, refreshToken };
  }
}
