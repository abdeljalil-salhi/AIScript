// Dependencies
import { Module } from '@nestjs/common';

// Services
import { AvatarService } from './avatar.service';
import { UserService } from 'src/user/user.service';
import { PlanService } from 'src/plan/plan.service';
import { PrismaService } from 'src/prisma/prisma.service';
// Resolvers
import { AvatarResolver } from './avatar.resolver';
// Controllers
import { AvatarController } from './avatar.controller';

/**
 * Represents the avatar module that encapsulates all avatar-related features
 * and functionalities.
 *
 * @export
 * @class AvatarModule
 */
@Module({
  providers: [
    AvatarResolver,
    AvatarService,
    PrismaService,
    UserService,
    PlanService,
  ],
  controllers: [AvatarController],
})
export class AvatarModule {}
