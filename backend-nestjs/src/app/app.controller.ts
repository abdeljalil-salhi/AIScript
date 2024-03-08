// Dependencies
import { Controller, Get } from '@nestjs/common';

// Services
import { AppService } from './app.service';
import { Public } from 'src/auth/decorators/public.decorator';

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
   * @public
   * @returns {string} - The version of the API.
   */
  @Public()
  @Get()
  getVersion(): string {
    return this.appService.getVersion();
  }
}
