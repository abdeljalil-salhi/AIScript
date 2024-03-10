// Dependencies
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Modules
import { UserModule } from 'src/user/user.module';
// Services
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
// Resolvers
import { AuthResolver } from './auth.resolver';
// Strategies
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

/**
 * The authentication module that encapsulates all authentication-related features
 * and functionalities.
 *
 * @export
 * @class AuthModule
 */
@Module({
  imports: [UserModule],
  providers: [
    AuthResolver,
    AuthService,
    PrismaService,
    JwtService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}