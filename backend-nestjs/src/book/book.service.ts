// Dependencies
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { WriteStream, createWriteStream } from 'fs';
import { ForbiddenException, Injectable, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

// Services
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { WalletService } from 'src/wallet/wallet.service';
// Entities
import { Book } from './entities/book.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';
// DTOs
import { NewBookInput } from './dtos/new-book.input';
// Interfaces
import { BookData } from 'src/socket/interfaces/book-data.interface';
// Constants
import { ShowcaseBookData, showcaseBooks } from 'src/constants/books';

/**
 * The book service that encapsulates all book-related features and functionalities.
 *
 * @export
 * @class BookService
 * @implements {OnModuleInit} - Lifecycle hook that is executed when the module is initialized.
 * @module BookModule
 */
@Injectable()
export class BookService implements OnModuleInit {
  /**
   * Creates an instance of BookService.
   *
   * @param {PrismaService} prismaService - The service for interacting with the Prisma ORM.
   * @param {HttpService} httpService - The service for making HTTP requests.
   * @param {UserService} userService - The service for handling user-related operations.
   * @param {WalletService} walletService - The service for handling wallet-related operations.
   */
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
    private readonly userService: UserService,
    private readonly walletService: WalletService,
  ) {}

  /**
   * Method called when the module is initialized.
   * This is used to create the showcase books when the application is started.
   *
   * @returns {Promise<void>} - A Promise that resolves when the module is initialized.
   */
  public async onModuleInit(): Promise<void> {
    await this.createShowcaseBooks();
  }

  /**
   * Creates the showcase books if they do not already exist.
   *
   * @returns {Promise<Book[]>} - The list of created showcase books.
   */
  public async createShowcaseBooks(): Promise<Book[]> {
    // Check if the showcase books already exist
    const existingShowcaseBooks: Book[] =
      await this.prismaService.book.findMany({
        where: {
          isShowcase: true,
        },
      });

    // If the showcase books already exist, return them
    if (existingShowcaseBooks.length > 0) return existingShowcaseBooks;

    // Otherwise, download the showcase books and store them in the database
    const readyShowcaseBooks: ShowcaseBookData[] = [];

    /**
     * Download the showcase books and store them in the local storage.
     * This is done in parallel to speed up the process.
     * The Promise.all() method is used to wait for all the files to be downloaded.
     */
    await Promise.all(
      showcaseBooks.map(
        async (showcaseBookData: ShowcaseBookData, index: number) => {
          const documentPath = `./uploads/docs/showcase-${index}.docx`;
          const coverPath = `./uploads/covers/showcase-${index}.png`;
          const pdfPath = `./uploads/pdfs/showcase-${index}.pdf`;

          // Download document
          await this.downloadFile(showcaseBookData.document, documentPath);

          // Download cover
          await this.downloadFile(showcaseBookData.cover, coverPath);

          // Download PDF
          await this.downloadFile(showcaseBookData.pdf, pdfPath);

          showcaseBookData.cover = `${process.env.BASE_URL}/book/cover/showcase-${index}.png`;
          showcaseBookData.document = `${process.env.BASE_URL}/book/document/showcase-${index}.docx`;
          showcaseBookData.pdf = `${process.env.BASE_URL}/book/pdf/showcase-${index}.pdf`;

          readyShowcaseBooks.push(showcaseBookData);
        },
      ),
    );

    /**
     * Create the showcase books in the database.
     * This is done in parallel to speed up the process.
     * The Promise.all() method is used to wait for all the books to be created.
     */
    return Promise.all(
      readyShowcaseBooks.map(async (showcaseBookData: ShowcaseBookData) => {
        return this.createBook({
          ownerId: (await this.userService.getFounder()).id,
          ...showcaseBookData,
          isShowcase: true,
        });
      }),
    );
  }

  /**
   * Downloads a file from the specified URL to the specified file path.
   *
   * @param {string} url - The URL of the file to download.
   * @param {string} filePath - The file path to save the downloaded file.
   * @returns {Promise<void>} - A Promise that resolves when the file is downloaded.
   */
  private async downloadFile(url: string, filePath: string): Promise<void> {
    // Create a write stream to save the file
    const writer: WriteStream = createWriteStream(filePath);

    // Make a GET request to download the file
    const response: AxiosResponse = await this.httpService.axiosRef({
      method: 'GET',
      url,
      responseType: 'stream',
    });

    // Pipe the response data to the writer
    response.data.pipe(writer);

    // Return a Promise that resolves when the writer finishes writing the file
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  }

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
      (isCoverAiGenerated ? 10 : 0)
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
        pdf: `${process.env.MEDIA_CDN_URL}/pdfs/${bookData.name}.pdf`,
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
        pdf: newBookInput.pdf,
        isShowcase: newBookInput.isShowcase,
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
   * Retrieves the showcase books.
   *
   * @returns {Promise<Book[]>} - The list of showcase books.
   */
  public async getShowcaseBooks(): Promise<Book[]> {
    return this.prismaService.book.findMany({
      where: {
        isShowcase: true,
      },
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
