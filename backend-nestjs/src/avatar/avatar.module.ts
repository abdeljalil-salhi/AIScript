import { Module } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { AvatarResolver } from './avatar.resolver';

@Module({
  providers: [AvatarResolver, AvatarService],
})
export class AvatarModule {}
