import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Injectable service that provides access to the Prisma ORM client.
 * Extends the PrismaClient class and implements the OnModuleInit interface.
 * Automatically establishes a database connection during module initialization.
 *
 * @export
 * @class PrismaService
 * @extends {PrismaClient}
 * @implements {OnModuleInit}
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * Establishes a database connection when the module initializes.
   * @returns {Promise<void>}
   */
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }
}
