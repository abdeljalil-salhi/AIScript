// DTOs
import { NewUserInput } from 'src/user/dtos/new-user.input';

/**
 * The founder user that is created when the application is started.
 *
 * @export
 * @constant
 * @type {NewUserInput}
 * @module UserModule
 */
export const founderUser: NewUserInput = {
  username: process.env.FOUNDER_USERNAME,
  avatar: {
    filename: '/default.png',
  },
  connection: {
    email: 'founder@aiscript.com',
    provider: 'local',
    password: process.env.FOUNDER_PASSWORD,
  },
};
