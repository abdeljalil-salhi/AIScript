// Dependencies
import { Module } from '@nestjs/common';

// Services
import { MailService } from './mail.service';

/**
 * The mail module, containing all mail-related functionality.
 *
 * @export
 * @class MailModule
 */
@Module({
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
