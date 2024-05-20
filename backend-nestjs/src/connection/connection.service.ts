// Dependencies
import { Injectable } from '@nestjs/common';

// Services
import { PrismaService } from 'src/prisma/prisma.service';
// DTOs
import { NewConnectionInput } from './dtos/new-connection.input';
// Entities
import { Connection } from './entities/connection.entity';

/**
 * The connection service that encapsulates all connection-related features and functionalities.
 * It is used by the connection resolver to perform CRUD operations.
 *
 * @export
 * @class ConnectionService
 * @module ConnectionModule
 */
@Injectable()
export class ConnectionService {
  /**
   * Creates an instance of the ConnectionService class.
   *
   * @param {PrismaService} prismaService - The Prisma service for database operations.
   */
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Creates a new connection entity.
   *
   * @param {NewConnectionInput} newConnectionInput - The input data to create a new connection.
   * @returns {Promise<Connection>} - The newly created connection entity.
   */
  public async createConnection(
    newConnectionInput: NewConnectionInput,
  ): Promise<Connection> {
    return this.prismaService.connection.create({
      data: {
        ...newConnectionInput,
        user: {
          connect: {
            id: newConnectionInput.user.id,
          },
        },
      },
    });
  }

  /**
   * Verifies the email of the specified connection.
   *
   * @param connectionId - The connection ID to verify the email.
   * @returns {Promise<Connection>} - The updated connection entity.
   */
  public async verifyEmail(connectionId: string): Promise<Connection> {
    return this.prismaService.connection.update({
      where: {
        id: connectionId,
      },
      data: {
        isEmailVerified: true,
      },
    });
  }

  /**
   * Finds a connection by their email.
   *
   * @param {string} email - The email of the connection to find.
   * @returns {Promise<Connection>} - The connection with the specified email.
   */
  public async findConnectionByEmail(email: string): Promise<Connection> {
    return this.prismaService.connection.findUnique({
      where: {
        email,
      },
      include: {
        user: true,
      },
    });
  }

  /**
   * Sets the one-time password for the specified connection by their user ID.
   *
   * @param {string} userId - The user ID of the connection.
   * @param {string} oneTimePassword - The one-time password to set.
   * @returns {Promise<Connection>} - The updated connection entity.
   */
  public async setOneTimePasswordByUserId(
    userId: string,
    oneTimePassword: string,
  ): Promise<Connection> {
    return this.prismaService.connection.update({
      where: {
        userId,
      },
      data: {
        otp: oneTimePassword,
        otpCreatedAt: new Date(),
      },
    });
  }
}
