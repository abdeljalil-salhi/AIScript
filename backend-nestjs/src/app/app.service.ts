// Dependencies
import { Injectable } from '@nestjs/common';

/**
 * Service responsible for providing the API root service.
 */
@Injectable()
export class AppService {
  /**
   * Returns the version of the API.
   *
   * @returns {string} - The version of the API.
   */
  getVersion(): string {
    return 'AIScript API v1.0.0';
  }
}
