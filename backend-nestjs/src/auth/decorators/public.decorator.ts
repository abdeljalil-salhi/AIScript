// Dependencies
import { CustomDecorator, SetMetadata } from '@nestjs/common';

/**
 * Custom decorator to mark a route as publicly accessible.
 *
 * This decorator sets metadata indicating that the route does not require authentication.
 * Routes marked with this decorator will be accessible without needing valid authentication.
 *
 * @export
 * @returns {CustomDecorator<string>} - The custom decorator function.
 */
export const Public = (): CustomDecorator<string> =>
  SetMetadata('isPublic', true);
