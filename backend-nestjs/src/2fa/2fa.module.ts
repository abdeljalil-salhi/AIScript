// Dependencies
import { Module } from '@nestjs/common';

// Services
import { TwoFactorAuthenticationService } from './2fa.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConnectionService } from 'src/connection/connection.service';

/**
 * The two-factor authentication module that encapsulates all two-factor authentication-related features
 * and functionalities.
 *
 * @export
 * @class TwoFactorAuthenticationModule
 */
@Module({
  providers: [TwoFactorAuthenticationService, PrismaService, ConnectionService],
  exports: [TwoFactorAuthenticationService],
})
export class TwoFactorAuthenticationModule {}
