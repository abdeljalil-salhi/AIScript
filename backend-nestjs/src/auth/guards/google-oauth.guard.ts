// Dependencies
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard class representing a Google OAuth authentication guard.
 *
 * This guard utilizes the 'google' strategy to validate Google accounts.
 *
 * @export
 * @class GoogleOAuthGuard
 * @extends {AuthGuard('google')}
 * @module AuthModule
 */
@Injectable()
export class GoogleOAuthGuard extends AuthGuard('google') {}
