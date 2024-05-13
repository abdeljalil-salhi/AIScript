// Dependencies
import { randomUUID } from 'crypto';
import { Injectable, NotFoundException } from '@nestjs/common';

// Services
import { PrismaService } from 'src/prisma/prisma.service';
import { ConnectionService } from 'src/connection/connection.service';
// Entities
import { EmailVerification } from './entities/email-verification.entity';

/**
 * Service for handling email verification-related operations.
 *
 * @export
 * @class EmailVerificationService
 * @module EmailVerificationModule
 */
@Injectable()
export class EmailVerificationService {
  /**
   * Creates an instance of EmailVerificationService.
   *
   * @param {PrismaService} prismaService - The Prisma service for database operations.
   */
  constructor(
    private readonly prismaService: PrismaService,
    private readonly connectionService: ConnectionService,
  ) {}

  /**
   * Creates an email verification for the specified email.
   *
   * @param {string} connectionId - The connection ID.
   * @param {string} email - The email address.
   * @returns {Promise<boolean>} - A Promise that resolves with a boolean indicating whether the email verification was created.
   */
  public async createEmailVerification(
    connectionId: string,
    email: string,
  ): Promise<EmailVerification> {
    return this.prismaService.emailVerification.create({
      data: {
        connection: {
          connect: {
            id: connectionId,
          },
        },
        email,
        token: randomUUID(), // Generate a random token.
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
      },
    });
  }

  /**
   * Verifies the email verification with the specified token.
   *
   * @param {string} token - The token to verify.
   * @returns {Promise<string>} - A Promise that resolves with a message indicating the result of the email verification.
   */
  public async verifyEmailVerification(token: string): Promise<string> {
    // Find the email verification by the token
    const emailVerification: EmailVerification =
      await this.findEmailVerificationByToken(token);

    // Check if the email verification exists
    if (!emailVerification)
      throw new NotFoundException('Invalid token or token expired');

    // Verify the email of the connection
    await this.connectionService.verifyEmail(emailVerification.connectionId);

    // Delete the email verification
    await this.deleteEmailVerification(emailVerification.id);

    return `Email verified successfully for ${emailVerification.email}!`;
  }

  /**
   * Finds an email verification by the specified token.
   *
   * @param {string} token - The token to search for.
   * @returns {Promise<EmailVerification | null>} - A Promise that resolves with the email verification or null if it was not found.
   */
  public async findEmailVerificationByToken(
    token: string,
  ): Promise<EmailVerification | null> {
    return this.prismaService.emailVerification.findFirst({
      where: {
        token,
      },
    });
  }

  /**
   * Deletes an email verification by the specified ID.
   *
   * @param {string} id - The email verification ID.
   * @returns {Promise<EmailVerification>} - A Promise that resolves with the deleted email verification.
   */
  public async deleteEmailVerification(id: string): Promise<EmailVerification> {
    return this.prismaService.emailVerification.delete({
      where: {
        id,
      },
    });
  }

  /**
   * Deletes all expired email verifications.
   *
   * @returns {Promise<void>} - A Promise that resolves when the expired email verifications have been deleted.
   */
  public async deleteExpiredEmailVerifications(): Promise<void> {
    await this.prismaService.emailVerification.deleteMany({
      where: {
        expiresAt: {
          lte: new Date(),
        },
      },
    });
  }
}
