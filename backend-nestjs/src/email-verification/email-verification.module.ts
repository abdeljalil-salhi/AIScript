// Dependencies
import { Module } from '@nestjs/common';

// Services
import { EmailVerificationService } from './email-verification.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConnectionService } from 'src/connection/connection.service';
import { MailService } from 'src/mail/mail.service';
// Resolvers
import { EmailVerificationResolver } from './email-verification.resolver';

/**
 * The email verification module, containing all email verification-related functionality.
 *
 * @export
 * @class EmailVerificationModule
 */
@Module({
  providers: [
    EmailVerificationResolver,
    EmailVerificationService,
    PrismaService,
    ConnectionService,
    MailService,
  ],
  exports: [EmailVerificationService],
})
export class EmailVerificationModule {}
