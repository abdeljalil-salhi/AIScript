// Dependencies
import { NestFactory } from '@nestjs/core';
import {
  BadRequestException,
  INestApplication,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

// Modules
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

  // Use the global validation pipe for all incoming requests
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const error_messages = errors.map((error) =>
          Object.values(error.constraints).join(', '),
        );
        return new BadRequestException(error_messages.toString());
      },
      forbidUnknownValues: false,
    }),
  );

  // Enable CORS for the application
  app.enableCors({
    origin: [process.env.FRONTEND_URL, process.env.DJANGO_URL],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Start listening on the specified port
  await app.listen(process.env.PORT || 3000);
};

// Call the bootstrap function and handle potential errors
bootstrap().catch((err: Error) => {
  console.error(err);
});
