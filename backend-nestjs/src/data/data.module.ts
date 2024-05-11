// Dependencies
import { Module } from '@nestjs/common';

// Services
import { DataService } from './data.service';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * The data module, containing all data-related functionality.
 *
 * @export
 * @class DataModule
 */
@Module({
  providers: [DataService, PrismaService],
  exports: [DataService],
})
export class DataModule {}
