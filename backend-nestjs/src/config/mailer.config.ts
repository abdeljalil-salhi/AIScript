// Dependencies
import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

/**
 * The mailer configuration options.
 *
 * @export
 * @constant mailerConfig
 * @type {MailerOptions}
 */
export const mailerConfig: MailerOptions = {
  transport: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS,
    },
  },
  defaults: {
    from: `"No Reply" <${process.env.MAILER_USER}>`,
  },
  preview: true,
  template: {
    dir: process.cwd() + '/templates/',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
