// Dependencies
import * as argon from 'argon2';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

// Services
import { PrismaService } from 'src/prisma/prisma.service';
import { PlanService } from 'src/plan/plan.service';
import { EmailVerificationService } from 'src/email-verification/email-verification.service';
// Entities
import { User } from './entities/user.entity';
import { EmailVerification } from 'src/email-verification/entities/email-verification.entity';
// DTOs
import { NewUserInput } from './dtos/new-user.input';
import { UpdateUserInput } from './dtos/update-user.input';
// Includes
import { userIncludes } from './includes/user.includes';

/**
 * Service for handling user-related operations.
 */
@Injectable()
export class UserService {
  /**
   * Initializes the user service with the specified dependencies.
   *
   * @param {PrismaService} prismaService - The service for interacting with the Prisma ORM.
   */
  constructor(
    private readonly prismaService: PrismaService,
    private readonly planService: PlanService,
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  /**
   * Checks if the provided username is an admin.
   *
   * @param {string} username - The username to check.
   * @returns {boolean} - Whether or not the user is an admin.
   */
  static checkIfUserIsAdmin(username: string): boolean {
    return process.env.ADMIN.split(',')
      .map((admin: string) => admin.trim())
      .includes(username);
  }

  /**
   * Finds a user by their ID.
   *
   * @param {string} userId - The ID of the user to find.
   * @returns {Promise<User>} - The user with the specified ID.
   * @throws {NotFoundException} - Thrown if the user is not found.
   */
  public async findById(userId: string): Promise<User> {
    const user: User = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      include: userIncludes,
    });

    // If the user is not found, throw a NotFoundException
    if (!user) throw new NotFoundException('User not found');

    // Return the user if found
    return user;
  }

  /**
   * Finds a user by their username or email.
   *
   * @param {string} usernameOrEmail - The username or email of the user to find.
   * @returns {Promise<User>} - The user with the specified username or email.
   * @throws {NotFoundException} - Thrown if the user is not found.
   */
  public async findByUsernameOrEmail(usernameOrEmail: string): Promise<User> {
    const user: User = await this.prismaService.user.findFirst({
      where: {
        OR: [
          {
            username: usernameOrEmail,
          },
          {
            connection: {
              email: usernameOrEmail,
            },
          },
        ],
      },
      include: userIncludes,
    });

    // If the user is not found, throw a NotFoundException
    if (!user) throw new NotFoundException('User not found');

    // Return the user if found
    return user;
  }

  /**
   * Hashes the specified password using Argon2.
   *
   * @param {string} password - The password to hash.
   * @returns {Promise<string>} - The hashed password.
   */
  public async hashPassword(password: string): Promise<string> {
    return argon.hash(password);
  }

  /**
   * Creates a new user with the specified details.
   *
   * @param {NewUserInput} newUserInput - The details of the new user to create.
   * @returns {Promise<User>} - The newly created user.
   */
  public async createUser(newUserInput: NewUserInput): Promise<User> {
    const user: User = await this.prismaService.user.create({
      data: {
        ...newUserInput,
        isAdmin: false,
        avatar: {
          create: {
            defaultFilename: '/default.png',
            filename: newUserInput.avatar.filename,
          },
        },
        connection: {
          create: {
            ...newUserInput.connection,
            isEmailVerified: newUserInput.connection.provider === 'google',
          },
        },
        wallet: {
          create: {},
        },
        subscription: {
          create: {
            plan: {
              connect: {
                id: this.planService.getBasicPlanId(),
              },
            },
          },
        },
      },
      include: userIncludes,
    });

    await this.prismaService.subscription.update({
      where: {
        id: user.subscription.id,
      },
      data: {
        ownerUserId: user.id,
      },
    });

    return user;
  }

  /**
   * Updates a user with the specified details.
   * Sends an email verification if the email is updated.
   *
   * @param {UpdateUserInput} updateUserInput - The details of the user to update.
   * @returns {Promise<User>} - The updated user.
   * @throws {ForbiddenException} - Thrown if the email verification cannot be sent.
   */
  public async updateUser(updateUserInput: UpdateUserInput): Promise<User> {
    const { userId, username, email } = updateUserInput;

    const user: User = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        username: username
          ? {
              set: username,
            }
          : undefined,
        connection: email
          ? {
              update: {
                email,
                isEmailVerified: false,
              },
            }
          : undefined,
      },
      include: userIncludes,
    });

    if (email) {
      // Delete old email verifications
      await this.prismaService.emailVerification.deleteMany({
        where: {
          connectionId: user.connection.id,
          email: {
            not: email,
          },
        },
      });

      // Create a new email verification for the new email
      const emailVerification: EmailVerification =
        await this.emailVerificationService.createEmailVerification(
          user.connection.id,
          email,
        );

      if (!emailVerification)
        throw new ForbiddenException('Unable to send email verification');
    }

    return user;
  }

  /**
   * Updates the avatar of a user.
   *
   * @param {string} userId - The ID of the user to update.
   * @param {string} avatar - The new avatar of the user.
   * @returns {Promise<User>} A promise that resolves to the updated user.
   * @throws {ForbiddenException} If the avatar cannot be updated.
   */
  public async updateAvatar(userId: string, avatar: string): Promise<User> {
    try {
      return this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: {
          avatar: {
            update: {
              filename: avatar,
            },
          },
        },
        include: userIncludes,
      });
    } catch (e) {
      throw new ForbiddenException('Unable to update avatar');
    }
  }

  /**
   * Resets the avatar of a user to the default avatar.
   *
   * @param {string} userId - The ID of the user to reset the avatar for.
   * @returns {Promise<User>} A promise that resolves to the updated user.
   */
  public async resetDefaultAvatar(userId: string): Promise<User> {
    const user: User = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        avatar: true,
      },
    });

    return this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        avatar: {
          update: {
            filename: user.avatar.defaultFilename,
          },
        },
      },
      include: userIncludes,
    });
  }

  /**
   * Updates the password of a user.
   * THE PASSWORD SHOULD BE HASHED BEFORE CALLING THIS FUNCTION.
   *
   * @param {string} userId - The ID of the user to update the password for.
   * @param {string} password - The new password to set.
   * @returns {Promise<User>} A promise that resolves to the updated user.
   */
  public async updatePassword(userId: string, password: string): Promise<User> {
    return this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        connection: {
          update: {
            password,
          },
        },
      },
      include: userIncludes,
    });
  }

  /**
   * Updates the user refresh token.
   * This is done to ensure that the user is authenticated and authorized.
   *
   * @param {string} userId - The ID of the user to update the refresh token for.
   * @param {string} refreshToken - The new refresh token for the user.
   * @returns {Promise<User>} - The updated user.
   */
  public async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<User> {
    return this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken,
      },
      include: userIncludes,
    });
  }
}
