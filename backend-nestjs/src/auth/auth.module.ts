// Dependencies
import { Module } from '@nestjs/common';

// Services
import { AuthResolver } from './auth.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
// Resolvers
import { AuthService } from './auth.service';

/**
 * The authentication module that encapsulates all authentication-related features
 * and functionalities.
 *
 * @export
 * @class AuthModule
 */
@Module({
  providers: [AuthResolver, AuthService, PrismaService],
})
export class AuthModule {}
