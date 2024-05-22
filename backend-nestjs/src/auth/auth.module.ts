// Dependencies
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Modules
import { UserModule } from 'src/user/user.module';
// Services
import { AuthService } from './auth.service';
import { MailService } from 'src/mail/mail.service';
import { EmailVerificationService } from 'src/email-verification/email-verification.service';
import { ConnectionService } from 'src/connection/connection.service';
import { PrismaService } from 'src/prisma/prisma.service';
// Resolvers
import { AuthResolver } from './auth.resolver';
// Strategies
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { ShortLivedTokenStrategy } from './strategies/short-lived-token.strategy';

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
    // Resolvers
    AuthResolver,

    // Services
    JwtService,
    AuthService,
    MailService,
    EmailVerificationService,
    ConnectionService,
    PrismaService,

    // Strategies
    AccessTokenStrategy,
    RefreshTokenStrategy,
    ShortLivedTokenStrategy,
  ],
})
export class AuthModule {}
