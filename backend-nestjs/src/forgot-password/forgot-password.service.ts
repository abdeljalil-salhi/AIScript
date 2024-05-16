// Dependencies
import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';

// Services
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
// Entities
import { ForgotPassword } from './entities/forgot-password.entity';

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
  ) {}

  /**
   * Creates a forgot password token for the specified email.
   *
   * @param {string} connectionId - The connection ID.
   * @param {string} email - The email address.
   * @returns {Promise<ForgotPassword>} - A Promise that resolves with the created forgot password token.
   */
  public async createForgotPassword(
    connectionId: string,
    email: string,
  ): Promise<ForgotPassword> {
    return this.prismaService.forgotPassword.create({
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
  }
}
