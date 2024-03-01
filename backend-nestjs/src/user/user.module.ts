// Dependencies
import { Module } from '@nestjs/common';

// Services
import { UserService } from './user.service';
// Resolvers
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
