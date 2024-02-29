import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';

import { AppModule } from './app/app.module';

/**
 * Bootstrap function to create and start the NestJS application.
 *
 * @async
 * @returns {Promise<void>}
 */
const bootstrap = async (): Promise<void> => {
  // Create the NestJS application instance
  const app: INestApplication = await NestFactory.create(AppModule);

  // Enable CORS for the application
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // Start listening on the specified port
  await app.listen(process.env.PORT || 3000);
};

// Call the bootstrap function and handle potential errors
bootstrap().catch((err: Error) => {
  console.error(err);
});
