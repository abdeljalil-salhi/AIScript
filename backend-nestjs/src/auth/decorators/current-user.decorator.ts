// Dependencies
import {
  ExecutionContext,
  ForbiddenException,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// Interfaces
import { JwtPayloadWithRefreshToken } from '../interfaces/jwt-payload-with-refresh-token.interface';

/**
 * Custom decorator to retrieve the current user from the request.
 *
 * This decorator extracts user information from the request object,
 * based on the provided data key or without specifying it.
 *
 * @export
 * @function CurrentUser
 * @param {keyof JwtPayloadWithRefreshToken | undefined} data - Optional data key to access a specific user property.
 * @param {ExecutionContext} context - Execution context containing request information.
 * @throws {ForbiddenException} - Throws an error if the user is not found.
 * @returns {(JwtPayloadWithRefreshToken | string | number | boolean)} - The user object or a specific user property.
 * @module AuthModule
 */
export const CurrentUser = createParamDecorator(
  (
    data: keyof JwtPayloadWithRefreshToken | undefined,
    context: ExecutionContext,
  ): JwtPayloadWithRefreshToken | string | number | boolean => {
    // Extract the request object from the GraphQL execution context
    const req = GqlExecutionContext.create(context).getContext().req;

    // If the user is not authenticated, throw an exception
    if (!req.user) throw new ForbiddenException('User not authenticated');

    // Extract the user object from the request
    const user: JwtPayloadWithRefreshToken =
      req.user as JwtPayloadWithRefreshToken;

    // If data key is provided, return the specified user property
    if (data) return user[data];

    // If no data key is provided, return the entire user object
    return user;
  },
);
