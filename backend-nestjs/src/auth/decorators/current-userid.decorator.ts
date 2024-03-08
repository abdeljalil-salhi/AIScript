// Dependencies
import {
  ExecutionContext,
  ForbiddenException,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// Interfaces
import { JwtPayload } from '../interfaces/jwt-payload.interface';

/**
 * Custom decorator to retrieve the ID of the current user from the request.
 *
 * This decorator extracts the ID of the current user from the request object.
 *
 * @export
 * @function CurrentUserId
 * @param {undefined} _ - Unused parameter (can be left as undefined).
 * @param {ExecutionContext} context - Execution context containing request information.
 * @throws {ForbiddenException} - If the user is not authenticated.
 * @returns {string} - The ID of the current user.
 * @module AuthModule
 */
export const CurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): string => {
    // Extract the request object from the GraphQL execution context
    const req = GqlExecutionContext.create(context).getContext().req;

    // If the user is not authenticated, throw an exception
    if (!req.user) throw new ForbiddenException('User not authenticated');

    // Extract the user object from the request
    const user: JwtPayload = req.user as JwtPayload;

    // Return the ID of the current user
    return user.id;
  },
);
