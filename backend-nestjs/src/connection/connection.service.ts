import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { NewConnectionInput } from './dtos/new-connection.input';
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
}
