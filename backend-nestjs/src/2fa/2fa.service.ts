// Dependencies
import { toDataURL } from 'qrcode';
import { authenticator } from 'otplib';
import { ForbiddenException, Injectable } from '@nestjs/common';

// Constants
import { twoFactorAuthenticationConfig } from 'src/constants/2fa';
// Services
import { UserService } from 'src/user/user.service';
import { ConnectionService } from 'src/connection/connection.service';
// Entities
import { User } from 'src/user/entities/user.entity';
import { Connection } from 'src/connection/entities/connection.entity';
// Interfaces
import { TwoFactorAuthenticationSecretWithUri } from './interfaces/2fa-secret-with-uri.interface';

/**
 * The two-factor authentication (2FA) service that encapsulates all two-factor authentication-related features
 * and functionalities.
 *
 * @export
 * @class TwoFactorAuthenticationService
 * @module TwoFactorAuthenticationModule
 */
@Injectable()
export class TwoFactorAuthenticationService {
  /**
   * Creates an instance of TwoFactorAuthenticationService.
   *
   * @param {ConnectionService} connectionService - The connection service for connection-related operations.
   */
  constructor(
    private readonly userService: UserService,
    private readonly connectionService: ConnectionService,
  ) {}

  /**
   * Generates a two-factor authentication secret and OTP authentication URI for a user.
   *
   * @param {string} userId - The ID of the user.
   * @param {string} username - The username of the user.
   * @returns {Promise<TwoFactorAuthenticationSecretWithUri>} - The two-factor authentication secret with the OTP authentication URI.
   */
  public async generateTwoFactorAuthenticationSecret(
    userId: string,
    username: string,
  ): Promise<TwoFactorAuthenticationSecretWithUri> {
    const secret: string = authenticator.generateSecret();
    const otpAuthUri: string = authenticator.keyuri(
      username,
      twoFactorAuthenticationConfig.appName,
      secret,
    );

    await this.setTwoFactorAuthenticationSecret(userId, secret);

    return {
      secret,
      otpAuthUri,
    };
  }

  /**
   * Sets the two-factor authentication secret for a user.
   *
   * @param {string} userId - The ID of the user.
   * @param {string} secret - The two-factor authentication secret.
   * @returns {Promise<Connection>} - The updated connection entity.
   */
  public async setTwoFactorAuthenticationSecret(
    userId: string,
    secret: string,
  ): Promise<Connection> {
    return this.connectionService.setOneTimePasswordByUserId(userId, secret);
  }

  /**
   * Generates a QR code data URI for the OTP authentication URI.
   *
   * @param otpAuthUri - The OTP authentication URI.
   * @returns {Promise<string>} - The QR code data URI.
   */
  public async generateQrCodeDataUri(otpAuthUri: string): Promise<string> {
    return toDataURL(otpAuthUri);
  }

  /**
   * Enables two-factor authentication for a user.
   *
   * @param {string} userId - The ID of the user.
   * @returns {Promise<Connection>} - The updated connection entity.
   */
  public async turnOnTwoFactorAuthentication(
    userId: string,
  ): Promise<Connection> {
    return this.connectionService.turnOnTwoFactorAuthentication(userId);
  }

  /**
   * Disables two-factor authentication for a user.
   *
   * @param {string} userId - The ID of the user.
   * @returns {Promise<Connection>} - The updated connection entity.
   */
  public async turnOffTwoFactorAuthentication(
    userId: string,
  ): Promise<Connection> {
    return this.connectionService.turnOffTwoFactorAuthentication(userId);
  }

  /**
   * Verifies a two-factor authentication one-time password.
   *
   * @param {string} userId - The ID of the user.
   * @param {string} oneTimePassword - The one-time password to verify.
   * @returns {Promise<boolean>} - The result of the verification.
   * @throws {ForbiddenException} - If two-factor authentication is not enabled.
   */
  public async verifyTwoFactorAuthentication(
    userId: string,
    oneTimePassword: string,
  ): Promise<boolean> {
    const user: User = await this.userService.findById(userId);

    if (!user) return false;

    if (!user.connection.otp)
      throw new ForbiddenException('Two-factor authentication is not enabled');

    return authenticator.verify({
      token: oneTimePassword,
      secret: user.connection.otp,
    });
  }
}
