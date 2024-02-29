import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

/**
 * Controller class for the root path of the API.
 *
 * @export
 * @class AppController
 */
@Controller('/')
export class AppController {
  /**
   * Creates an instance of the AppController class.
   *
   * @param {AppService} appService - The AppService instance.
   */
  constructor(private readonly appService: AppService) {}

  /**
   * Returns the version of the API.
   *
   * @returns {string} - The version of the API.
   */
  @Get()
  getVersion(): string {
    return this.appService.getVersion();
  }
}
