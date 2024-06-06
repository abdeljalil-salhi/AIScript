// Dependencies
import { join } from 'path';
import { GraphQLError } from 'graphql';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';
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
import { SubscriptionModule } from 'src/subscription/subscription.module';
import { DataModule } from 'src/data/data.module';
import { EmailVerificationModule } from 'src/email-verification/email-verification.module';
import { ForgotPasswordModule } from 'src/forgot-password/forgot-password.module';
import { TwoFactorAuthenticationModule } from 'src/2fa/2fa.module';
import { BookModule } from 'src/book/book.module';
// Guards
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
// Config
import { mailerConfig } from 'src/config/mailer.config';
// Utils
import { graphQLErrorFormatter } from './utils/graphql-error-formatter';
import { SocketGateway } from 'src/socket/socket.gateway';
import { SocketService } from 'src/socket/socket.service';
import { SessionModule } from 'nestjs-session';

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
      formatError: (error: GraphQLError) => graphQLErrorFormatter(error), // Format the error messages
    }),

    // Configure the mailer module
    MailerModule.forRoot(mailerConfig),

    // Enable the scheduling module
    ScheduleModule.forRoot(),

    // Configure the session module
    SessionModule.forRoot({
      session: {
        secret: process.env.SESSION_SECRET, // Use the session secret from the environment variables
        resave: false, // Do not save the session if it has not been modified
        saveUninitialized: true, // Save the session even if it is new
        cookie: {
          secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        },
      },
    }),

    AuthModule,
    UserModule,
    AvatarModule,
    ConnectionModule,
    WalletModule,
    TasksModule,
    PlanModule,
    PaymentModule,
    SubscriptionModule,
    DataModule,
    EmailVerificationModule,
    ForgotPasswordModule,
    TwoFactorAuthenticationModule,
    BookModule,
  ],

  providers: [
    AppService,

    // Use access token guard for all routes
    { provide: APP_GUARD, useClass: AccessTokenGuard },

    // Provide the socket gateway and service to the application
    SocketGateway,
    SocketService,
  ],
  controllers: [AppController],
})
export class AppModule {}
