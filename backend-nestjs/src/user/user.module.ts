import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

/**
 * The user module, containing all user-related functionality.
 *
 * @export
 * @class UserModule
 */
@Module({
  providers: [UserResolver, UserService],
})
export class UserModule {}
