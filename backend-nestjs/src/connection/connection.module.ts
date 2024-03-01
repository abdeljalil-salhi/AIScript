import { Module } from '@nestjs/common';

import { ConnectionService } from './connection.service';
import { ConnectionResolver } from './connection.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

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
