// Dependencies
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

/**
 * Service for handling mail-related operations.
 *
 * @export
 * @class MailService
 * @module MailModule
 */
@Injectable()
export class MailService {
  /**
   * Creates an instance of MailService.
   *
   * @param {MailerService} mailerService - Mailer service
   */
  constructor(private readonly mailerService: MailerService) {}

  /**
   * Sends a mail to the specified receiver.
   *
   * @param {string} receiver - Receiver email address
   * @param {string} subject - Mail subject
   * @param {string} content - Mail content
   * @param {string} [link] - Mail link
   * @returns {Promise<boolean>} - Mail sent
   */
  public async sendMail(
    receiver: string,
    subject: string,
    content: string,
    link?: string,
  ): Promise<boolean> {
    try {
      await this.mailerService.sendMail({
        to: receiver,
        subject,
        html: `<h1>${subject}</h1><p>${content}</p>${
          link ? `<a href="${link}">Click here</a>` : ''
        }`,
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
