// Dependencies
import { Module } from '@nestjs/common';

// Services
import { UserService } from './user.service';
import { PlanService } from 'src/plan/plan.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailVerificationService } from 'src/email-verification/email-verification.service';
import { MailService } from 'src/mail/mail.service';
import { ConnectionService } from 'src/connection/connection.service';
// Resolvers
import { UserResolver } from './user.resolver';

/**
 * The user module, containing all user-related functionality.
 *
 * @export
 * @class UserModule
 */
@Module({
  providers: [
    UserResolver,
    UserService,
    PrismaService,
    PlanService,
    EmailVerificationService,
    MailService,
    ConnectionService,
  ],
  exports: [UserService],
})
export class UserModule {}
