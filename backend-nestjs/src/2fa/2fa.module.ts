// Dependencies
import { Module } from '@nestjs/common';

// Services
import { TwoFactorAuthenticationService } from './2fa.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { ConnectionService } from 'src/connection/connection.service';
import { PlanService } from 'src/plan/plan.service';
import { EmailVerificationService } from 'src/email-verification/email-verification.service';
import { MailService } from 'src/mail/mail.service';

/**
 * The two-factor authentication module that encapsulates all two-factor authentication-related features
 * and functionalities.
 *
 * @export
 * @class TwoFactorAuthenticationModule
 */
@Module({
  providers: [
    TwoFactorAuthenticationService,
    PrismaService,
    UserService,
    ConnectionService,
    PlanService,
    EmailVerificationService,
    MailService,
  ],
  exports: [TwoFactorAuthenticationService],
})
export class TwoFactorAuthenticationModule {}
