// Dependencies
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Services
import { ForgotPasswordService } from './forgot-password.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { MailService } from 'src/mail/mail.service';
import { EmailVerificationService } from 'src/email-verification/email-verification.service';
import { PlanService } from 'src/plan/plan.service';
import { ConnectionService } from 'src/connection/connection.service';
// Resolvers
import { ForgotPasswordResolver } from './forgot-password.resolver';

/**
 * The forgot password module, containing all forgot password-related functionality.
 *
 * @export
 * @class ForgotPasswordModule
 */
@Module({
  providers: [
    ForgotPasswordResolver,
    ForgotPasswordService,
    PrismaService,
    AuthService,
    JwtService,
    UserService,
    MailService,
    EmailVerificationService,
    PlanService,
    ConnectionService,
  ],
  exports: [ForgotPasswordService],
})
export class ForgotPasswordModule {}
