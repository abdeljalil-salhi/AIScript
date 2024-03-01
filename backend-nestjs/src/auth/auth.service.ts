// Dependencies
import { Injectable } from '@nestjs/common';

// Services
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * The authentication service that encapsulates all authentication-related features and functionalities.
 *
 * @export
 * @class AuthService
 * @module AuthModule
 */
@Injectable()
export class AuthService {
  /**
   * Creates an instance of the AuthService class.
   *
   * @param {PrismaService} prismaService - The Prisma service for database operations.
   */
  constructor(private readonly prismaService: PrismaService) {}
}
