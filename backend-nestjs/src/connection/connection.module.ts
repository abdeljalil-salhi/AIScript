import { Module } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { ConnectionResolver } from './connection.resolver';

@Module({
  providers: [ConnectionResolver, ConnectionService],
})
export class ConnectionModule {}
