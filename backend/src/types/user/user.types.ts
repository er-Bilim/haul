import type { Types } from 'mongoose';

export interface IUser {
  email: string;
  displayName: string;
  avatar: string | null;
  password: string;
  role: string;
  refreshToken: string;
  establishments: Types.ObjectId[];
  reviews: Types.ObjectId[];
  images: Types.ObjectId[];
}

export interface IUserSend {
  _id: string;
  email: string;
  displayName: string;
  avatar: string | null;
  role: string;
  establishments?: string[];
}

export type IUserSave = Omit<IUser, 'role'>;
export type IUserReg = Omit<
  IUser,
  'role' | 'refreshToken' | 'googleID' | 'establishments' | 'reviews' | 'images'
>;
