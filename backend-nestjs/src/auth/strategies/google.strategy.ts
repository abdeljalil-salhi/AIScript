// Dependencies
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';

// Interfaces
import { OAuthUser } from '../interfaces/oauth-user.interface';

/**
 * The strategy that handles the validation of Google accounts.
 *
 * @export
 * @class GoogleStrategy
 * @extends {PassportStrategy(Strategy, 'google')}
 * @module AuthModule
 */
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  /**
   * Creates an instance of the Google strategy.
   */
  constructor() {
    super({
      // The client ID of the Google application
      clientID: process.env.GOOGLE_CLIENT_ID,
      // The client secret of the Google application
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // The callback URL of the Google application
      callbackURL: process.env.GOOGLE_CALLBACK_URL,

      // The scopes that the Google application can access
      scope: ['profile', 'email'],
    });
  }

  /**
   * Validates the Google account.
   *
   * @param {string} _accessToken - The access token of the Google account.
   * @param {string} _refreshToken - The refresh token of the Google account.
   * @param {*} profile - The profile of the Google account.
   * @param {VerifyCallback} done - The callback function.
   * @returns {Promise<void>} - The validated user.
   */
  public async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<void> {
    // Extract the required information from the Google profile
    const { name, emails, photos } = profile;

    // Prepare the OAuth user object
    const user: OAuthUser = {
      provider: 'google',
      email: emails[0].value,
      name: name.givenName,
      avatar: photos[0].value,
    };

    // Return the validated user
    done(null, user);
  }
}
