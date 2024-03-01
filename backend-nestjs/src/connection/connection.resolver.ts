import { Resolver } from '@nestjs/graphql';
import { ConnectionService } from './connection.service';

/**
 * The connection resolver that encapsulates all connection-related GraphQL queries,
 * mutations, and subscriptions.
 *
 * @export
 * @class ConnectionResolver
 * @module ConnectionModule
 */
@Resolver()
export class ConnectionResolver {
  /**
   * Creates an instance of the ConnectionResolver class.
   *
   * @param {ConnectionService} connectionService - The ConnectionService instance.
   */
  constructor(private readonly connectionService: ConnectionService) {}
}
