// Dependencies
import { Resolver } from '@nestjs/graphql';

// Services
import { AuthService } from './auth.service';

/**
 * The authentication resolver that encapsulates all authentication-related GraphQL queries,
 * mutations, and subscriptions.
 *
 * @export
 * @class AuthResolver
 * @module AuthModule
 */
@Resolver()
export class AuthResolver {
  /**
   * Creates an instance of the AuthResolver class.
   *
   * @param {AuthService} authService - The AuthService instance.
   */
  constructor(private readonly authService: AuthService) {}
}
