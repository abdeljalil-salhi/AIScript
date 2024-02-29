import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/user/user.module';

/**
 * The root module of the application.
 *
 * @export
 * @class AppModule
 */
@Module({
  imports: [
    // Load the environment variables globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configure the GraphQL module
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // Use the Apollo Server driver
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Generate the schema to the specified file
      playground: true, // Enable the GraphQL Playground
      sortSchema: true, // Sort the schema alphabetically
      includeStacktraceInErrorResponses: false, // Disable the stack trace in error responses
    }),

    UserModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
