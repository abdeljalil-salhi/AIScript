// Dependencies
import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard class representing a refresh token authentication guard.
 *
 * This guard utilizes the 'jwt-refresh' strategy to validate refresh tokens.
 *
 * @export
 * @class RefreshTokenGuard
 */
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
  /**
   * Creates an instance of the RefreshTokenGuard class.
   */
  constructor() {
    super();
  }

  /**
   * Retrieves the incoming request from the execution context.
   *
   * @template T - The type of the incoming request.
   * @param {ExecutionContext} context - The current execution context.
   * @returns {T} - The incoming request.
   */
  getRequest<T = any>(context: ExecutionContext): T {
    return GqlExecutionContext.create(context).getContext().req;
  }
}
