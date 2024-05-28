// Dependencies
import { firstValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

// Services
import { PrismaService } from 'src/prisma/prisma.service';
// Entities
import { Book } from './entities/book.entity';
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
  ) {}

  /**
   * Generates a book by calling the Django server.
   *
   * @param {string} userId - The ID of the user generating the book.
   * @param {BookData} bookData - The data to generate the book.
   * @returns {Promise<Book>} - The generated book.
   */
  public async generateBook(userId: string, bookData: BookData): Promise<Book> {
    const inputData = bookData;

    try {
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

      const responseData = response.data;

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
