// Dependencies
import { Module } from '@nestjs/common';

// Services
import { AvatarService } from './avatar.service';
import { PrismaService } from 'src/prisma/prisma.service';
// Resolvers
import { AvatarResolver } from './avatar.resolver';

/**
 * Represents the avatar module that encapsulates all avatar-related features
 * and functionalities.
 *
 * @export
 * @class AvatarModule
 */
@Module({
  providers: [AvatarResolver, AvatarService, PrismaService],
})
export class AvatarModule {}
