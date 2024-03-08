// Dependencies
import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

// Entities
import { User } from 'src/user/entities/user.entity';

/**
 * Input type to create a new connection;
 * This is used as input to the `createConnection` mutation.
 *
 * @export
 * @class NewConnectionInput
 * @module ConnectionModule
 */
@InputType()
export class NewConnectionInput {
  /**
   * Associated user entity that owns the connection
   * @type {User}
   */
  @IsNotEmpty({ message: 'New connection user must not be empty' })
  @Field(() => User, {
    description: 'Associated user entity that owns the connection',
  })
  public user: User;

  /**
   * Email of the connection
   * @type {string}
   */
  @IsNotEmpty({ message: 'New connection email must not be empty' })
  @Field(() => String, { description: 'Email of the connection' })
  public email: string;

  /**
   * Provider of the connection
   * @type {string}
   */
  @IsNotEmpty({ message: 'New connection provider must not be empty' })
  @Field(() => String, { description: 'Provider of the connection' })
  public provider: string;
}
