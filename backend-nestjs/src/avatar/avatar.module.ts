import { Module } from '@nestjs/common';

import { AvatarService } from './avatar.service';
import { AvatarResolver } from './avatar.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

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
