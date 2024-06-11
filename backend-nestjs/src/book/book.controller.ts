// Dependencies
import { Request, Response } from 'express';
import { diskStorage } from 'multer';
import {
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

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
   * Uploads a book cover and return the URL.
   *
   * @public
   * @param {Request} _ - The request object.
   * @param {Express.Multer.File} file - The uploaded file.
   * @returns {Promise<string>} The URL of the uploaded cover.
   * @throws {ForbiddenException} If the file type is not supported.
   */
  @Public()
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: './uploads/covers',
        filename: (_, file: Express.Multer.File, cb) => {
          cb(
            null,
            `${Date.now()}-${file.originalname
              .replace(/\s/g, '')
              .split('.')
              .slice(0, -1)
              .join('.')}.png`,
          );
        },
      }),
      fileFilter: (_, file: Express.Multer.File, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) cb(null, true);
        else cb(new ForbiddenException('Unsupported file type'), false);
      },
    }),
  )
  public async uploadCover(
    @Req() _: Request,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    return `${process.env.BASE_URL}/book/cover/${file.filename}`;
  }

  /**
   * Retrieves a book cover by its filename.
   *
   * @public
   * @param {string} filename - The filename of the cover.
   * @param {Response} res - The response object.
   * @returns {void}
   * @throws {NotFoundException} If the cover is not found.
   */
  @Public()
  @Get('cover/:filename')
  public getCover(
    @Param('filename') filename: string,
    @Res() res: Response,
  ): void {
    try {
      return res.sendFile(filename, {
        root: 'uploads/covers',
        dotfiles: 'deny',
      });
    } catch (e) {
      throw new NotFoundException('Cover not found');
    }
  }

  /**
   * Gets a book document by its filename.
   *
   * @public
   * @param {string} filename - The filename of the book document.
   * @param {Response} res - The response object.
   * @returns {void}
   * @throws {NotFoundException} If the book document is not found.
   */
  @Public()
  @Get('document/:filename')
  public getBook(
    @Param('filename') filename: string,
    @Res() res: Response,
  ): void {
    try {
      return res.sendFile(filename, {
        root: 'uploads/docs',
        dotfiles: 'deny',
      });
    } catch (e) {
      throw new NotFoundException('Document not found');
    }
  }

  /**
   * Gets a book PDF by its filename.
   *
   * @public
   * @param {string} filename - The filename of the book PDF.
   * @param {Response} res - The response object.
   * @returns {void}
   * @throws {NotFoundException} If the book PDF is not found.
   */
  @Public()
  @Get('pdf/:filename')
  public getPdf(
    @Param('filename') filename: string,
    @Res() res: Response,
  ): void {
    try {
      return res.sendFile(filename, {
        root: 'uploads/pdfs',
        dotfiles: 'deny',
      });
    } catch (e) {
      throw new NotFoundException('PDF not found');
    }
  }
}
