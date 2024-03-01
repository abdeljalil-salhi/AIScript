// Dependencies
import { Resolver } from '@nestjs/graphql';

// Services
import { AvatarService } from './avatar.service';

/**
 * The avatar resolver that encapsulates all avatar-related GraphQL queries,
 * mutations, and subscriptions.
 *
 * @export
 * @class AvatarResolver
 * @module AvatarModule
 */
@Resolver()
export class AvatarResolver {
  /**
   * Creates an instance of the AvatarResolver class.
   *
   * @param {AvatarService} avatarService - The AvatarService instance.
   */
  constructor(private readonly avatarService: AvatarService) {}
}
