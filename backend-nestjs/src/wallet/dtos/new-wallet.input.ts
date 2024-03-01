// Dependencies
import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

// Entities
import { User } from 'src/user/entities/user.entity';

/**
 * Input type to create a new wallet;
 * This is used as input to the `createWallet` mutation.
 *
 * @export
 * @class NewWalletInput
 * @module WalletModule
 */
@InputType()
export class NewWalletInput {
  /**
   * Associated user entity that owns the wallet
   * @type {User}
   */
  @IsNotEmpty({ message: 'New wallet user must not be empty' })
  @Field(() => User, {
    description: 'Associated user entity that owns the wallet',
  })
  public user: User;
}
