// Dependencies
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

// Entities
import { User } from 'src/user/entities/user.entity';

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
  @Field(() => User, {
    description: 'Wallet associated user entity',
    nullable: true,
  })
  user?: User;

  /**
   * Balance of the wallet
   * @type {number}
   * @default 50
   */
  @IsNotEmpty({ message: 'Wallet balance must not be empty' })
  @IsNumber({}, { message: 'Wallet balance must be a number' })
  @Field(() => Number, {
    description: 'Balance of the wallet',
    defaultValue: 50,
  })
  public balance: number;

  /**
   * Number of free credits available in the wallet
   * @type {number}
   * @default 50
   */
  @IsNotEmpty({ message: 'Wallet free credits must not be empty' })
  @IsNumber({}, { message: 'Wallet free credits must be a number' })
  @Field(() => Number, {
    description: 'Number of free credits available in the wallet',
    defaultValue: 50,
  })
  public freeCredits: number;

  /**
   * Number of subscription credits available in the wallet
   * @type {number}
   * @default 0
   */
  @IsNotEmpty({ message: 'Wallet subscription credits must not be empty' })
  @IsNumber({}, { message: 'Wallet subscription credits must be a number' })
  @Field(() => Number, {
    description: 'Number of subscription credits available in the wallet',
    defaultValue: 0,
  })
  public subscriptionCredits: number;

  /**
   * Number of top-up credits available in the wallet
   * @type {number}
   * @default 0
   */
  @IsNotEmpty({ message: 'Wallet top-up credits must not be empty' })
  @IsNumber({}, { message: 'Wallet top-up credits must be a number' })
  @Field(() => Number, {
    description: 'Number of top-up credits available in the wallet',
    defaultValue: 0,
  })
  public topUpCredits: number;

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
