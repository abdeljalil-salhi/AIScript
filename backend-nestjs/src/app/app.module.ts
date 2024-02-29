import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

/**
 * The root module of the application.
 *
 * @export
 * @class AppModule
 */
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
