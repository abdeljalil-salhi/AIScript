// Dependencies
import { Response } from 'express';
import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';

// Decorators
import { Public } from 'src/auth/decorators/public.decorator';

/**
 * The BookController class is responsible for handling requests related to books.
 *
 * @public
 * @class BookController
 * @module BookModule
 */
@Controller('book')
export class BookController {
  /**
   * Creates an instance of the BookController class.
   */
  constructor() {}

  /**
   * Gets a book by its filename.
   *
   * @public
   * @param {string} filename - The filename of the book.
   * @param {Response} res - The response object.
   * @returns {void}
   * @throws {NotFoundException} If the book is not found.
   */
  @Public()
  @Get(':filename')
  public getBook(
    @Param('filename') filename: string,
    @Res() res: Response,
  ): void {
    try {
      return res.sendFile(filename, {
        root: 'uploads/books',
        dotfiles: 'deny',
      });
    } catch (e) {
      throw new NotFoundException('Book not found');
    }
  }
}
