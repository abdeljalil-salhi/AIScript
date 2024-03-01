// Dependencies
import { Injectable } from '@nestjs/common';

// Services
import { PrismaService } from 'src/prisma/prisma.service';
// DTOs
import { NewAvatarInput } from './dtos/new-avatar.input';
// Entities
import { Avatar } from './entities/avatar.entity';

/**
 * The avatar service that encapsulates all avatar-related features and functionalities.
 * It is used by the avatar resolver to perform CRUD operations.
 * Also, it is used by the user module.
 *
 * @export
 * @class AvatarService
 * @module AvatarModule
 */
@Injectable()
export class AvatarService {
  /**
   * Creates an instance of the AvatarService class.
   *
   * @param {PrismaService} prismaService - The Prisma service for database operations.
   */
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Creates a new avatar entity.
   *
   * @param {NewAvatarInput} newAvatarInput - The input data to create a new avatar.
   * @returns {Promise<Avatar>} - The newly created avatar entity.
   */
  public async createAvatar(newAvatarInput: NewAvatarInput): Promise<Avatar> {
    return this.prismaService.avatar.create({
      data: {
        ...newAvatarInput,
        user: {
          connect: {
            id: newAvatarInput.user.id,
          },
        },
      },
    });
  }
}
