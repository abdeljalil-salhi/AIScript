import { Resolver } from '@nestjs/graphql';
import { AvatarService } from './avatar.service';

@Resolver()
export class AvatarResolver {
  constructor(private readonly avatarService: AvatarService) {}
}
