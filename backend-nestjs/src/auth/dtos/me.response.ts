// Dependencies
import { IsNotEmpty } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

// Entities
import { User } from 'src/user/entities/user.entity';

/**
 * Represents the response after a user's check operation.
 *
 * @export
 * @class MeResponse
 * @module AuthModule
 */
@ObjectType()
export class MeResponse {
  /**
   * The user's details.
   * @type {User}
   */
  @IsNotEmpty({ message: 'User details must not be empty' })
  @Field(() => User, { description: 'User details' })
  public user: User;
}
