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

// Services
import { UserService } from 'src/user/user.service';
// Entities
import { User } from 'src/user/entities/user.entity';
// Decorators
import { Public } from 'src/auth/decorators/public.decorator';

/**
 * The AvatarController class is responsible for handling requests related to avatars.
 *
 * @public
 * @class AvatarController
 * @module AvatarModule
 */
@Controller('avatar')
export class AvatarController {
  /**
   * Creates an instance of the AvatarController class.
   *
   * @param {UserService} userService - The user service used for resolving user-related queries.
   */
  constructor(private readonly userService: UserService) {}

  /**
   * Uploads an avatar for a user.
   *
   * @public
   * @param {Request} req - The request object.
   * @param {Express.Multer.File} file - The uploaded file.
   * @returns {Promise<User>} The updated user.
   * @throws {ForbiddenException} If the file type is not supported.
   */
  @Public()
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads',
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
  uploadAvatar(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<User> {
    return this.userService.updateAvatar(
      req.body.userId,
      `${process.env.BASE_URL}/avatar/${file.filename}`,
    );
  }

  /**
   * Retrieves an avatar by its filename.
   *
   * @public
   * @param {string} filename - The filename of the avatar.
   * @param {Response} res - The response object.
   * @returns {void}
   * @throws {NotFoundException} If the file is not found.
   */
  @Public()
  @Get(':filename')
  getAvatar(@Param('filename') filename: string, @Res() res: Response): void {
    try {
      return res.sendFile(filename, {
        root: 'uploads',
      });
    } catch (e) {
      throw new NotFoundException('File not found');
    }
  }
}
