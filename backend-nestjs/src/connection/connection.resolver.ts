import { Resolver } from '@nestjs/graphql';
import { ConnectionService } from './connection.service';

@Resolver()
export class ConnectionResolver {
  constructor(private readonly connectionService: ConnectionService) {}
}
