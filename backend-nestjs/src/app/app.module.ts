// Dependencies
import { join } from 'path';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

// Controllers
import { AppController } from './app.controller';
// Services
import { AppService } from './app.service';
// Modules
import { AvatarModule } from 'src/avatar/avatar.module';
import { ConnectionModule } from 'src/connection/connection.module';
import { UserModule } from 'src/user/user.module';
import { WalletModule } from 'src/wallet/wallet.module';
import { AuthModule } from 'src/auth/auth.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { PaymentModule } from 'src/payment/payment.module';
import { PlanModule } from 'src/plan/plan.module';
// Guards
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';

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

    // Enable the scheduling module
    ScheduleModule.forRoot(),

    AuthModule,
    UserModule,
    AvatarModule,
    ConnectionModule,
    WalletModule,
    TasksModule,
    PlanModule,
    PaymentModule,
  ],

  providers: [
    AppService,
    // Use access token guard for all routes
    { provide: APP_GUARD, useClass: AccessTokenGuard },
  ],
  controllers: [AppController],
})
export class AppModule {}
