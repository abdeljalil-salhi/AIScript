// Dependencies
import { Query, Resolver } from '@nestjs/graphql';

// Services
import { UserService } from './user.service';

/**
 * Resolver for handling user-related GraphQL queries and mutations.
 *
 * @export
 * @class UserResolver
 * @module UserModule
 */
@Resolver()
export class UserResolver {
  /**
   *  Creates an instance of the user resolver class.
   *
   * @param {UserService} userService - The user service
   */
  constructor(private readonly userService: UserService) {}

  /**
   * A simple hello world query to test the GraphQL API.
   *
   * @returns {Promise<string>} The hello world message
   */
  @Query(() => String, {
    name: 'hello',
    description: 'A simple hello world query to test the GraphQL API.',
  })
  public async hello(): Promise<string> {
    return 'Hello World!';
  }
}
