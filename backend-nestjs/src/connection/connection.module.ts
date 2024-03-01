// Dependencies
import { Module } from '@nestjs/common';

// Services
import { ConnectionService } from './connection.service';
import { PrismaService } from 'src/prisma/prisma.service';
// Resolvers
import { ConnectionResolver } from './connection.resolver';

/**
 * Represents the connection module that encapsulates all connection-related features
 * and functionalities.
 *
 * @export
 * @class ConnectionModule
 */
@Module({
  providers: [ConnectionResolver, ConnectionService, PrismaService],
})
export class ConnectionModule {}
