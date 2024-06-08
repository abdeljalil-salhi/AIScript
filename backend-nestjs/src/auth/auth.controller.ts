// Dependencies
import { Request, Response } from 'express';
import {
  Controller,
  Get,
  HttpException,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

// Services
import { AuthService } from './auth.service';
// Guards
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { XTwitterOAuthGuard } from './guards/xtwitter-oauth.guard';
// Decorators
import { Public } from './decorators/public.decorator';
// Interfaces
import { OAuthUser } from './interfaces/oauth-user.interface';
// DTOs
import { AuthResponse } from './dtos/auth.response';

/**
 * The controller that handles the authentication routes.
 *
 * @export
 * @class AuthController
 * @module AuthModule
 */
@Controller('auth')
export class AuthController {
  /**
   * Creates an instance of the Authentication controller.
   *
   * @param {AuthService} authService - The authentication service.
   */
  constructor(private authService: AuthService) {}

  /**
   * Authenticates the user using Google OAuth.
   * This route redirects the user to the Google OAuth page.
   *
   * @public
   * @useGuards GoogleOAuthGuard
   * @returns {Promise<void>} - The response
   */
  @Public()
  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  public async googleAuth(): Promise<void> {}

  /**
   * Handles the Google OAuth callback.
   * This route is called after the user authenticates with Google.
   *
   * @public
   * @useGuards GoogleOAuthGuard
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>} - The response
   */
  @Public()
  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  public async googleAuthCallback(
    @Req() req: Request & { user: OAuthUser },
    @Res() res: Response,
  ): Promise<void> {
    try {
      /**
       * The response containing the tokens and the user information.
       */
      const response: AuthResponse = await this.authService.loginWithOAuth(
        req.user as OAuthUser,
      );

      // Set the access token cookie
      res.cookie('access_token', response.accessToken, {
        maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : true,
        secure: process.env.NODE_ENV === 'production',
      });

      if (response.is2faEnabled)
        // Set the short-lived token cookie
        res.cookie('short_lived_token', response.shortLivedToken, {
          maxAge: 60 * 30 * 1000, // 30 minutes
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : true,
          secure: process.env.NODE_ENV === 'production',
        });

      // Redirect the user to the frontend with the 2FA status
      res.redirect(
        `${process.env.FRONTEND_URL}/google?2fa=${response.is2faEnabled ? 1 : 0}`,
      );
    } catch (e) {
      console.log(e);

      let errorCode: string = '0';

      if (e instanceof HttpException) {
        const response: string | object = e.getResponse();
        if (typeof response === 'object' && response !== null)
          errorCode = response['error'] || errorCode;
      }

      // Redirect the user to the frontend with the error code
      res.redirect(`${process.env.FRONTEND_URL}/google?error=${errorCode}`);
    }
  }

  /**
   * Authenticates the user using Twitter OAuth.
   * This route redirects the user to the Twitter OAuth page.
   *
   * @public
   * @useGuards XTwitterOAuthGuard
   * @returns {Promise<void>} - The response
   */
  @Public()
  @Get('twitter')
  @UseGuards(XTwitterOAuthGuard)
  public async twitterAuth(): Promise<void> {}

  /**
   * Handles the Twitter OAuth callback.
   * This route is called after the user authenticates with Twitter.
   *
   * @public
   * @useGuards XTwitterOAuthGuard
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>} - The response
   */
  @Public()
  @Get('twitter/callback')
  @UseGuards(XTwitterOAuthGuard)
  public async twitterAuthCallback(
    @Req() req: Request & { user: OAuthUser },
    @Res() res: Response,
  ): Promise<void> {
    try {
      /**
       * The response containing the tokens and the user information.
       */
      const response: AuthResponse = await this.authService.loginWithOAuth(
        req.user as OAuthUser,
      );

      // Set the access token cookie
      res.cookie('access_token', response.accessToken, {
        maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : true,
        secure: process.env.NODE_ENV === 'production',
      });

      if (response.is2faEnabled)
        // Set the short-lived token cookie
        res.cookie('short_lived_token', response.shortLivedToken, {
          maxAge: 60 * 30 * 1000, // 30 minutes
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : true,
          secure: process.env.NODE_ENV === 'production',
        });

      // Redirect the user to the frontend with the 2FA status
      res.redirect(
        `${process.env.FRONTEND_URL}/x?2fa=${response.is2faEnabled ? 1 : 0}`,
      );
    } catch (e) {
      console.log(e);

      let errorCode: string = '0';

      if (e instanceof HttpException) {
        const response: string | object = e.getResponse();
        if (typeof response === 'object' && response !== null)
          errorCode = response['error'] || errorCode;
      }

      // Redirect the user to the frontend with the error code
      res.redirect(`${process.env.FRONTEND_URL}/x?error=${errorCode}`);
    }
  }
}
