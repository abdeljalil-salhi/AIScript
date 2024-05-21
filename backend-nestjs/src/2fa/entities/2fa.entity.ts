// Dependencies
import { IsBoolean, IsString } from 'class-validator';
import { ObjectType, Field } from '@nestjs/graphql';

// Entities
import { User } from 'src/user/entities/user.entity';
import { Connection } from 'src/connection/entities/connection.entity';

/**
 * Represents a two-factor authentication (2FA) entity that is used by GraphQL
 * Encapsulates fundamental two-factor authentication-related data
 *
 * @export
 * @class TwoFactorAuthentication
 * @module TwoFactorAuthenticationModule
 */
@ObjectType()
export class TwoFactorAuthentication {
  /**
   * The one-time password authentication URI
   * @type {string}
   * @nullable
   */
  @IsString({
    message: 'The one-time password authentication URI must be a string',
  })
  @Field(() => String, {
    description: 'The one-time password authentication URI',
    nullable: true,
  })
  public otpAuthUri?: string;

  /**
   * The associated connection entity
   * @type {Connection}
   * @nullable
   */
  @Field(() => Connection, {
    description: 'The associated connection entity',
    nullable: true,
  })
  public connection?: Connection;

  /**
   * The two-factor authentication (2FA) validation status
   * @type {boolean}
   * @nullable
   */
  @IsBoolean({
    message:
      'The two-factor authentication (2FA) validation status must be a boolean',
  })
  @Field(() => Boolean, {
    description: 'The two-factor authentication (2FA) validation status',
    nullable: true,
  })
  public is2faValid?: boolean;

  /**
   * The two-factor authentication (2FA) status
   * @type {string}
   * @nullable
   */
  @IsString({
    message: 'The two-factor authentication (2FA) status must be a string',
  })
  @Field(() => String, {
    description: 'The two-factor authentication (2FA) status',
    nullable: true,
  })
  public status?: string;
}
