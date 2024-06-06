// Dependencies
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-twitter';

// Interfaces
import { OAuthUser } from '../interfaces/oauth-user.interface';

/**
 * The strategy that handles the validation of Twitter accounts.
 *
 * @export
 * @class XTwitterStrategy
 * @extends {PassportStrategy(Strategy, 'twitter')}
 * @module AuthModule
 */
@Injectable()
export class XTwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  /**
   * Creates an instance of the Twitter strategy.
   */
  constructor() {
    super({
      // The consumer key of the Twitter application
      consumerKey: process.env.X_CONSUMER_KEY,
      // The consumer secret of the Twitter application
      consumerSecret: process.env.X_CONSUMER_SECRET,
      // The callback URL of the Twitter application
      callbackURL: process.env.X_CALLBACK_URL,
      // Include the email address in the profile
      includeEmail: true,
    });
  }

  /**
   * Validates the Twitter account.
   *
   * @param {string} _accessToken - The access token of the Twitter account.
   * @param {string} _refreshToken - The refresh token of the Twitter account.
   * @param {Profile} profile - The profile of the Twitter account.
   * @param {*} done - The callback function.
   * @returns {Promise<void>} - The validated user.
   */
  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: any,
  ): Promise<void> {
    // Extract the required information from the Twitter profile
    const { emails, username, photos } = profile;

    // Prepare the OAuth user object
    const user: OAuthUser = {
      provider: 'xtwitter',
      email: emails[0].value,
      name: username,
      avatar: photos[0].value,
    };

    // Return the validated user
    done(null, user);
  }
}
