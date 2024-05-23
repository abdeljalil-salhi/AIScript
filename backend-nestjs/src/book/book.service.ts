// Dependencies
import { Injectable } from '@nestjs/common';

// Services
import { PrismaService } from 'src/prisma/prisma.service';
// Entities
import { Book } from './entities/book.entity';
// DTOs
import { NewBookInput } from './dtos/new-book.input';

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
   */
  constructor(private readonly prismaService: PrismaService) {}

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
        document: '/path/to/document.docx',
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
