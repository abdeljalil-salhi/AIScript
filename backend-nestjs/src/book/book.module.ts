// Dependencies
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

// Resolvers
import { BookResolver } from './book.resolver';
// Services
import { BookService } from './book.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { WalletService } from 'src/wallet/wallet.service';
// Controllers
import { BookController } from './book.controller';

/**
 * The book module, containing all book-related functionality.
 *
 * @export
 * @class BookModule
 */
@Module({
  imports: [HttpModule], // Import the HttpModule to make HTTP requests
  providers: [
    // Resolvers
    BookResolver,

    // Services
    BookService,
    PrismaService,
    WalletService,
  ],
  exports: [BookService],
  controllers: [BookController],
})
export class BookModule {}
