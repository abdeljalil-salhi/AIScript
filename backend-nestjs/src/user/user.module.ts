// Dependencies
import { Module } from '@nestjs/common';

// Services
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
// Resolvers
import { UserResolver } from './user.resolver';

/**
 * The user module, containing all user-related functionality.
 *
 * @export
 * @class UserModule
 */
@Module({
  providers: [UserResolver, UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
