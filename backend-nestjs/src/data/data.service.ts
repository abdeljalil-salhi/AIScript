// Dependencies
import { Injectable, OnModuleInit } from '@nestjs/common';

// Constants
import { canceledSubscriptionsIds } from 'src/constants/data';
// Services
import { PrismaService } from 'src/prisma/prisma.service';
// Entities
import { Data } from './entities/data.entity';

/**
 * The data service, containing all data-related functionality.
 *
 * @export
 * @class DataService
 */
@Injectable()
export class DataService implements OnModuleInit {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Method called when the module is initialized.
   * This is used to create the data variables when the application is started.
   *
   * @returns {Promise<void>} - A Promise that resolves when the module is initialized.
   */
  public async onModuleInit(): Promise<void> {
    await this.createDataVariables();
  }

  /**
   * Creates the data variables when the application is started.
   *
   * @returns {Promise<void>} - A Promise that resolves when the data variables are created.
   */
  public async createDataVariables(): Promise<void> {
    await this.prismaService.data.createMany({
      data: [
        {
          key: 'canceledSubscriptionsIds',
          value: JSON.stringify(canceledSubscriptionsIds),
        },
      ],
      skipDuplicates: true,
    });
  }

  /**
   * Set a data variable by its key.
   *
   * @param {string} key - The key of the data variable to retrieve.
   * @returns {Promise<Data>} - The data variable with the specified key.
   */
  public async setDataVariables(key: string, value: string): Promise<Data> {
    return this.prismaService.data.update({
      where: {
        key,
      },
      data: {
        key,
        value,
      },
    });
  }

  /**
   * Get a data variable by its key.
   *
   * @param {string} key - The key of the data variable to retrieve.
   * @returns {Promise<string>} - The value of the data variable with the specified key.
   */
  public async getDataVariables(key: string): Promise<string> {
    return (
      await this.prismaService.data.findUnique({
        where: {
          key,
        },
      })
    ).value;
  }
}
