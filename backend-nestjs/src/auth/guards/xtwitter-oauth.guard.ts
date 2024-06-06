// Dependencies
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard class representing a Twitter OAuth authentication guard.
 *
 * This guard utilizes the 'twitter' strategy to validate Twitter accounts.
 *
 * @export
 * @class XTwitterOAuthGuard
 * @extends {AuthGuard('xtwitter')}
 * @module AuthModule
 */
@Injectable()
export class XTwitterOAuthGuard extends AuthGuard('twitter') {}
