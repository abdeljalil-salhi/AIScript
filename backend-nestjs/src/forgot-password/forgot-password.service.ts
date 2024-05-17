// Dependencies
import { randomUUID } from 'crypto';
import { Injectable, NotFoundException } from '@nestjs/common';

// Services
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { MailService } from 'src/mail/mail.service';
// Entities
import { ForgotPassword } from './entities/forgot-password.entity';
// DTOs
import { VerifyForgotPasswordInput } from './dtos/verify-forgot-password.input';
import { AuthResponse } from 'src/auth/dtos/auth.response';
import { ForgotPasswordInput } from 'src/auth/dtos/forgot-password.input';

/**
 * Service for handling forgot password-related operations.
 *
 * @export
 * @class ForgotPasswordService
 * @module ForgotPasswordModule
 */
@Injectable()
export class ForgotPasswordService {
  /**
   * Creates an instance of ForgotPasswordService.
   *
   * @param {PrismaService} prismaService - The Prisma service for database operations.
   * @param {AuthService} authService - The authentication service for user operations.
   */
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}

  /**
   * Creates a forgot password token for the specified email.
   * Sends an email to the user with a link to reset their password.
   *
   * @param {string} connectionId - The connection ID.
   * @param {string} email - The email address.
   * @returns {Promise<ForgotPassword>} - A Promise that resolves with the created forgot password token.
   */
  public async createForgotPassword(
    connectionId: string,
    email: string,
  ): Promise<ForgotPassword> {
    const forgotPassword: ForgotPassword =
      await this.prismaService.forgotPassword.create({
        data: {
          connection: {
            connect: {
              id: connectionId,
            },
          },
          email,
          token: randomUUID(), // Generate a random token.
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 12 hours
        },
      });

    // Send a forgot password email to the user
    await this.mailService.sendMail(
      email,
      'Forgot Password',
      'Click the following link to reset your password; the link will expire in 24 hours.',
      `${process.env.FRONTEND_URL}/forgot-password/${forgotPassword.token}`,
    );

    return forgotPassword;
  }

  /**
   * Verifies the forgot password with the specified token.
   *
   * @param {VerifyForgotPasswordInput} forgotPasswordInput - The input data to verify the forgot password token.
   * @returns {Promise<AuthResponse>} - A Promise that resolves with the authentication response.
   * @throws {NotFoundException} - Thrown if the forgot password token is invalid or expired.
   * @throws {NotFoundException} - Thrown if the email is invalid.
   * @throws {NotFoundException} - Thrown if the user is not found or the password is not updated.
   */
  public async verifyForgotPassword(
    verifyForgotPasswordInput: VerifyForgotPasswordInput,
  ): Promise<AuthResponse> {
    // Find the forgot password request by the token
    const forgotPassword: ForgotPassword = await this.findForgotPasswordByToken(
      verifyForgotPasswordInput.token,
    );

    // Check if the forgot password request exists
    if (!forgotPassword)
      throw new NotFoundException('Invalid or expired forgot password token');

    // Check if the email matches
    if (forgotPassword.email !== verifyForgotPasswordInput.email)
      throw new NotFoundException('Invalid email');

    // Prepare the authentication service's forgot password input
    const forgotPasswordInput: ForgotPasswordInput = {
      email: verifyForgotPasswordInput.email,
      password: verifyForgotPasswordInput.password,
      confirmPassword: verifyForgotPasswordInput.confirmPassword,
    };

    // Change the user's password
    const authResponse: AuthResponse =
      await this.authService.forgotPassword(forgotPasswordInput);

    // Check if the user was successfully updated
    if (!authResponse.user)
      throw new NotFoundException('User not found or password not updated');

    // Delete the forgot password request
    await this.deleteForgotPassword(forgotPassword.id);

    return authResponse;
  }

  /**
   * Finds a forgot password entity by the specified token.
   *
   * @param {string} token - The token to search for.
   * @returns {Promise<ForgotPassword | null>} - A Promise that resolves with the found forgot password entity, or null if not found.
   */
  public async findForgotPasswordByToken(
    token: string,
  ): Promise<ForgotPassword | null> {
    return this.prismaService.forgotPassword.findFirst({
      where: {
        token,
      },
    });
  }

  /**
   * Deletes the forgot password entity with the specified ID
   *
   * @param {string} id - The ID of the forgot password entity to delete.
   * @returns {Promise<ForgotPassword>} - A Promise that resolves with the deleted forgot password entity.
   */
  public async deleteForgotPassword(id: string): Promise<ForgotPassword> {
    return this.prismaService.forgotPassword.delete({
      where: {
        id,
      },
    });
  }

  /**
   * Deletes all expired forgot password tokens.
   *
   * @returns {Promise<void>} - A Promise that resolves when all expired forgot password tokens are deleted.
   */
  public async deleteExpiredForgotPasswords(): Promise<void> {
    await this.prismaService.forgotPassword.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }
}
