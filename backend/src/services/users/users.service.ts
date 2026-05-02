import type { HydratedDocument } from 'mongoose';
import type {
  IUser,
  IUserReg,
  IUserSave,
  IUserSend,
} from '../../types/user/user.types.ts';
import User from '../../model/user/User.ts';
import jwt from 'jsonwebtoken';
import config from '../../config.ts';

interface IUsersService {
  registration: (
    data: IUserReg,
  ) => Promise<{ user: IUserSave; refreshToken: string; accessToken: string }>;
  authentication: (
    username: string,
    password: string,
  ) => Promise<{
    user: IUserReg | null;
    refreshToken: string | null;
    accessToken: string | null;
    isMatch: boolean;
  }>;
  logout: (user: HydratedDocument<IUser>) => Promise<void>;
  getUserByRefreshToken: (refreshToken: string) => Promise<IUserSend | null>;
  getUserByAccessToken: (accessToken: string) => Promise<IUserSend | null>;
  generateUserAccessToken: (user_id: string) => Promise<string | null>;
}

const UsersService: IUsersService = {
  async registration(data) {
    const newUser = new User(data);
    const refreshToken: string = newUser.generateRefreshToken();
    const accessToken: string = newUser.generateAccessToken();

    const user = await newUser.save();

    return {
      user,
      refreshToken,
      accessToken,
    };
  },

  async authentication(username, password) {
    const user = await User.findOne({ username }).populate(
      'establishments',
      '-owner -images -reviews -__v',
    );
    const data = {
      user,
      isMatch: false,
      refreshToken: null,
      accessToken: null,
    };

    if (user) {
      const refreshToken: string = user.generateRefreshToken();
      const accessToken: string = user.generateAccessToken();
      await user.save();
      data.user = user;

      const isMatch: boolean = await user.checkPassword(password);
      if (isMatch) {
        return {
          user,
          isMatch,
          refreshToken,
          accessToken,
        };
      }
    }

    return data;
  },

  async logout(user) {
    user.refreshToken = '';
    await user.save();
  },

  async getUserByRefreshToken(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, config.refreshJWTSecret) as {
        _id: string;
      };

      const user = await User.findOne({
        _id: decoded._id,
        refreshToken,
      });
      return user as IUserSend | null;
    } catch (error) {
      return null;
    }
  },

  async getUserByAccessToken(accessToken) {
    try {
      const decoded = jwt.verify(accessToken, config.accessJWTSecret) as {
        _id: string;
      };

      const user = await User.findOne({
        _id: decoded._id,
      });

      return user as IUserSend | null;
    } catch (error) {
      return null;
    }
  },

  async generateUserAccessToken(user_id) {
    const user = await User.findOne({ _id: user_id });
    if (!user) return null;

    const accessToken = user.generateAccessToken();
    return accessToken;
  },
};

export default UsersService;
