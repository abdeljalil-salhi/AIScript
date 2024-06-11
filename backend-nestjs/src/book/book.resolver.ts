// Dependencies
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

// Services
import { BookService } from './book.service';
// Entities
import { Book } from './entities/book.entity';
// DTOs
import { NewBookInput } from './dtos/new-book.input';

/**
 * The book resolver that encapsulates all book-related GraphQL queries and mutations.
 *
 * @export
 * @class BookResolver
 * @module BookModule
 */
@Resolver()
export class BookResolver {
  /**
   * Creates an instance of the BookResolver class.
   *
   * @param {BookService} bookService - The BookService instance for handling book operations.
   */
  constructor(private readonly bookService: BookService) {}

  /**
   * Mutation to create a new book entity.
   *
   * @mutation
   * @param {NewBookInput} newBookInput - The input data to create a new book.
   * @returns {Promise<Book>} - The newly created book entity.
   */
  @Mutation(() => Book, {
    name: 'createBook',
    description: 'Creates a new book entity.',
  })
  public async createBook(
    @Args('newBookInput') newBookInput: NewBookInput,
  ): Promise<Book> {
    return this.bookService.createBook(newBookInput);
  }

  /**
   * Query to retrieve all book entities.
   *
   * @query
   * @returns {Promise<Book[]>} - The list of all book entities.
   */
  @Query(() => [Book], {
    name: 'getAllBooks',
    description: 'Retrieves all book entities.',
  })
  public async getAllBooks(): Promise<Book[]> {
    return this.bookService.getAllBooks();
  }

  /**
   * Query to retrieve all showcase books.
   *
   * @query
   * @returns {Promise<Book[]>} - The list of all showcase books.
   */
  @Query(() => [Book], {
    name: 'getShowcaseBooks',
    description: 'Retrieves all showcase books.',
  })
  public async getShowcaseBooks(): Promise<Book[]> {
    return this.bookService.getShowcaseBooks();
  }

  /**
   * Query to retrieve a book entity by ID.
   *
   * @query
   * @param {string} bookId - The ID of the book entity to retrieve.
   * @returns {Promise<Book>} - The book entity with the specified ID.
   * @nullable
   */
  @Query(() => Book, {
    name: 'getBookById',
    description: 'Retrieves a book entity by ID.',
    nullable: true,
  })
  public async getBookById(
    @Args('bookId', { type: () => String }) bookId: string,
  ): Promise<Book> {
    return this.bookService.getBookById(bookId);
  }

  /**
   * Query to retrieve all book entities of a user.
   *
   * @query
   * @param {string} userId - The ID of the user to retrieve books for.
   * @returns {Promise<Book[]>} - The list of book entities for the specified user.
   */
  @Query(() => [Book], {
    name: 'getBooksByUserId',
    description: 'Retrieves all book entities of a user.',
  })
  public async getBooksByUserId(
    @Args('userId', { type: () => String }) userId: string,
  ): Promise<Book[]> {
    return this.bookService.getBooksByUserId(userId);
  }

  /**
   * Mutation to delete a book entity by ID.
   *
   * @mutation
   * @param {string} bookId - The ID of the book entity to delete.
   * @returns {Promise<Book>} - The deleted book entity.
   * @nullable
   */
  @Mutation(() => Book, {
    name: 'deleteBookById',
    description: 'Deletes a book entity by ID.',
    nullable: true,
  })
  public async deleteBookById(
    @Args('bookId', { type: () => String }) bookId: string,
  ): Promise<Book> {
    return this.bookService.deleteBookById(bookId);
  }
}
