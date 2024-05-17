// Dependencies
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ForbiddenException } from '@nestjs/common';

// Services
import { UserService } from './user.service';
// DTOs
import { UpdateUserInput } from './dtos/update-user.input';
// Entities
import { User } from './entities/user.entity';
// Decorators
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

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
   * Mutation to update a user by their ID.
   *
   * @mutation
   * @param {UpdateUserInput} updateUserInput - The input data to update a user.
   * @returns {Promise<User>} - The updated user entity.
   * @throws {ForbiddenException} - Thrown if the authenticated user is trying to update another user.
   */
  @Mutation(() => User, {
    name: 'updateUser',
    description: 'Update a user by their ID',
  })
  public async updateUser(
    @CurrentUser('id') userId: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    if (updateUserInput.userId !== userId)
      throw new ForbiddenException('You can only update your own user');

    return this.userService.updateUser(updateUserInput);
  }
}
