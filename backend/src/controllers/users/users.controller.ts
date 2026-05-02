import type { Request, Response, NextFunction } from 'express';
import type { IUserReg } from '../../types/user/user.types.ts';
import UsersService from '../../services/users/users.service.ts';
import { clearCookieToken, setCookieToken } from '../../utils/sendToken.ts';
import isValidationError from '../../utils/validationError.ts';
import { MINUTES_15, WEEK } from '../../constants/constants.ts';
import type { RequestWithUser } from '../../middlewares/auth.ts';

interface IUsersController {
  registration: (req: Request, res: Response, next: NextFunction) => void;
  authentication: (req: Request, res: Response, next: NextFunction) => void;
  logout: (req: Request, res: Response, next: NextFunction) => void;
  token: (req: Request, res: Response, next: NextFunction) => void;
}

const UsersController: IUsersController = {
  async registration(req, res, next) {
    const body: IUserReg = req.body;
    const correctUserData: IUserReg = {
      email: body.email,
      displayName: body.displayName,
      avatar: req.file ? `uploads/users/avatar/${req.file.filename}` : null,
      password: body.password,
    };

    try {
      const { user, refreshToken, accessToken } =
        await UsersService.registration(correctUserData);

      setCookieToken(res, 'refreshToken', refreshToken, WEEK);
      setCookieToken(res, 'accessToken', accessToken, MINUTES_15);

      res.json({
        message: 'Registration successful',
        user,
      });
    } catch (error) {
      if (isValidationError(error)) {
        res.status(400).json({ error: isValidationError(error) });
      }
      next(error);
    }
  },

  async authentication(req, res, next) {
    const { email, password } = req.body;

    try {
      const { user, refreshToken, accessToken, isMatch } =
        await UsersService.authentication(email, password);

      if (!user) {
        return res.status(404).json({
          error: 'User is not found',
        });
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Password is incorrect' });
      }

      if (!refreshToken || !accessToken) return;
      setCookieToken(res, 'refreshToken', refreshToken, WEEK);
      setCookieToken(res, 'accessToken', accessToken, MINUTES_15);

      res.json({
        message: 'Authentication successful',
        user,
      });
    } catch (error) {
      next(error);
    }
  },

  async logout(req, res, next) {
    try {
      const userReq = req as RequestWithUser;

      const user = userReq.user;

      await UsersService.logout(user);

      clearCookieToken(res, 'refreshToken');
      clearCookieToken(res, 'accessToken');

      return res.json({
        message: 'Logout successfully!',
      });
    } catch (error) {
      next(error);
    }
  },

  async token(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({
          error: 'No refresh token present',
        });
      }

      const user = await UsersService.getUserByRefreshToken(refreshToken);

      if (!user) {
        return res.status(401).json({
          error: 'Invalid or expired refresh token',
        });
      }

      const accessToken = await UsersService.generateUserAccessToken(user._id);
      if (!accessToken) {
        return res.status(404).json({
          error: 'User not found',
        });
      }

      setCookieToken(res, 'accessToken', accessToken, MINUTES_15);

      res.json({
        message: 'Access token refreshed successfully',
      });
    } catch (error) {
      res.status(401).json({
        error: 'Invalid or expected refresh token',
      });

      next(error);
    }
  },
};

export default UsersController;
