// Dependencies
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Resolvers
import { TwoFactorAuthenticationResolver } from './2fa.resolver';
// Services
import { TwoFactorAuthenticationService } from './2fa.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { ConnectionService } from 'src/connection/connection.service';
import { PlanService } from 'src/plan/plan.service';
import { EmailVerificationService } from 'src/email-verification/email-verification.service';
import { MailService } from 'src/mail/mail.service';
// Strategies
import { ShortLivedTokenStrategy } from 'src/auth/strategies/short-lived-token.strategy';

/**
 * The two-factor authentication module that encapsulates all two-factor authentication-related features
 * and functionalities.
 *
 * @export
 * @class TwoFactorAuthenticationModule
 */
@Module({
  providers: [
    // Resolvers
    TwoFactorAuthenticationResolver,

    // Dependency Services
    JwtService,

    // Services
    TwoFactorAuthenticationService,
    PrismaService,
    AuthService,
    UserService,
    ConnectionService,
    PlanService,
    EmailVerificationService,
    MailService,

    // Strategies
    ShortLivedTokenStrategy,
  ],
  exports: [TwoFactorAuthenticationService],
})
export class TwoFactorAuthenticationModule {}
