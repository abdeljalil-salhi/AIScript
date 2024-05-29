// Dependencies
import { firstValueFrom } from 'rxjs';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

// Services
import { PrismaService } from 'src/prisma/prisma.service';
import { WalletService } from 'src/wallet/wallet.service';
// Entities
import { Book } from './entities/book.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';
// DTOs
import { NewBookInput } from './dtos/new-book.input';
// Interfaces
import { BookData } from 'src/socket/interfaces/book-data.interface';

/**
 * The book service that encapsulates all book-related features and functionalities.
 *
 * @export
 * @class BookService
 * @module BookModule
 */
@Injectable()
export class BookService {
  /**
   * Creates an instance of BookService.
   *
   * @param {PrismaService} prismaService - The service for interacting with the Prisma ORM.
   * @param {HttpService} httpService - The service for making HTTP requests.
   */
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
    private readonly walletService: WalletService,
  ) {}

  /**
   * Calculates the price of a book based on the provided book data.
   *
   * @param {BookData} bookData - The data to calculate the book price.
   * @returns {number} - The calculated price of the book.
   */
  public calculateBookPrice(bookData: BookData): number {
    const isOverFiveChapters: boolean = bookData.numChapters > 5;
    const isOverFiveSectionsAndFiveChapters: boolean =
      isOverFiveChapters && bookData.numSections > 5;
    const isCoverAiGenerated: boolean = bookData.cover === 'ai';
    return (
      (isOverFiveChapters ? 15 : 10) +
      (isOverFiveSectionsAndFiveChapters ? 5 : 0) +
      (isCoverAiGenerated ? 5 : 0)
    );
  }

  /**
   * Generates a book by calling the Django server.
   *
   * @param {string} userId - The ID of the user generating the book.
   * @param {BookData} bookData - The data to generate the book.
   * @param {Wallet} wallet - The user's wallet entity.
   * @param {number} [price=10] - The price of the book.
   * @returns {Promise<Book>} - The generated book.
   */
  public async generateBook(
    userId: string,
    bookData: BookData,
    wallet: Wallet,
    price: number = this.calculateBookPrice(bookData),
  ): Promise<Book> {
    const inputData = bookData;

    // Check if the user has enough credits
    if (wallet.balance < price)
      throw new ForbiddenException(
        'You do not have enough credits to generate this book. Please consider adding funds to your wallet.',
      );

    try {
      // Send a POST request to the Django server to generate the book
      const response = await firstValueFrom(
        this.httpService.post(
          `${process.env.DJANGO_URL}/book-create/`,
          inputData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      // Extract the response data
      const responseData = response.data;

      // Deduct the price of the book from the user's wallet
      await this.walletService.deductCreditsFromWallet(wallet.id, price);

      // Store the book in the database
      return this.createBook({
        ownerId: userId,
        author: responseData.author,
        title: responseData.title,
        topic: responseData.topic,
        targetAudience: responseData.target_audience,
        numChapters: responseData.num_chapters,
        numSubsections: responseData.num_subsections,
        cover: `${process.env.DJANGO_URL}/${responseData.cover}`,
        document: `${process.env.MEDIA_CDN_URL}/docs/${bookData.name}.docx`,
      });
    } catch (error: unknown) {
      // Handle the error appropriately
      console.error('Error making POST request to Django server:', error);
      return null;
    }
  }

  /**
   * Creates a new book.
   *
   * @param {NewBookInput} newBookInput - The input data to create a new book.
   * @returns {Promise<Book>} - The newly created book.
   */
  public async createBook(newBookInput: NewBookInput): Promise<Book> {
    return this.prismaService.book.create({
      data: {
        owner: {
          connect: {
            id: newBookInput.ownerId,
          },
        },
        author: newBookInput.author,
        title: newBookInput.title,
        topic: newBookInput.topic,
        targetAudience: newBookInput.targetAudience,
        numChapters: newBookInput.numChapters,
        numSubsections: newBookInput.numSubsections,
        cover: newBookInput.cover,
        document: newBookInput.document,
        pdf: '/path/to/pdf.pdf',
      },
      include: {
        owner: true,
      },
    });
  }

  /**
   * Retrieves all books.
   *
   * @returns {Promise<Book[]>} - The list of all books.
   */
  public async getAllBooks(): Promise<Book[]> {
    return this.prismaService.book.findMany({
      include: {
        owner: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Retrieves a book by its ID.
   *
   * @param {string} bookId - The ID of the book to retrieve.
   * @returns {Promise<Book>} - The book with the specified ID.
   */
  public async getBookById(bookId: string): Promise<Book> {
    return this.prismaService.book.findUnique({
      where: {
        id: bookId,
      },
      include: {
        owner: true,
      },
    });
  }

  /**
   * Retrieves all books of a user.
   *
   * @param {string} userId - The ID of the user whose books to retrieve.
   * @returns {Promise<Book[]>} - The list of books owned by the specified user.
   */
  public async getBooksByUserId(userId: string): Promise<Book[]> {
    return this.prismaService.book.findMany({
      where: {
        ownerId: userId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  /**
   * Deletes a book by its ID.
   *
   * @param {string} bookId - The ID of the book to delete.
   * @returns {Promise<Book>} - The deleted book.
   */
  public async deleteBookById(bookId: string): Promise<Book> {
    return this.prismaService.book.delete({
      where: {
        id: bookId,
      },
    });
  }
}
