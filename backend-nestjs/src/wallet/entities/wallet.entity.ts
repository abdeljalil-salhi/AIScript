import { IsDate, IsNotEmpty } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * Represents a wallet entity that is used by GraphQL
 *
 * @export
 * @class Wallet
 * @module WalletModule
 */
@ObjectType()
export class Wallet {
  /**
   * Unique identifier of the wallet
   * @type {string}
   */
  @IsNotEmpty({ message: 'Wallet ID must not be empty' })
  @Field(() => String, { description: 'Unique identifier of the wallet' })
  public id: string;

  /**
   * ID of the associated user
   * @type {string}
   */
  @IsNotEmpty({ message: 'Wallet user ID must not be empty' })
  @Field(() => String, {
    description: 'ID of the associated user that owns the wallet',
  })
  public userId: string;

  /**
   * Associated user entity
   * @type {User}
   */
  user?: any;

  /**
   * Balance of the wallet
   * @type {number}
   * @default 0
   */
  @IsNotEmpty({ message: 'Wallet balance must not be empty' })
  @Field(() => Number, {
    description: 'Balance of the wallet',
    defaultValue: 0,
  })
  public balance: number;

  /**
   * Date and time of the wallet creation
   * @type {Date}
   * @example 2021-09-01T12:00:00.000Z
   */
  @IsNotEmpty({ message: 'Wallet created at must not be empty' })
  @IsDate({ message: 'Wallet created at must be a date' })
  @Field(() => Date, { description: 'Date and time of the wallet creation' })
  public createdAt: Date;

  /**
   * Date and time of the wallet update
   * @type {Date}
   * @example 2021-09-01T12:00:00.000Z
   */
  @IsNotEmpty({ message: 'Wallet updated at must not be empty' })
  @IsDate({ message: 'Wallet updated at must be a date' })
  @Field(() => Date, {
    description: 'Date and time of the wallet last update',
  })
  public updatedAt: Date;
}
