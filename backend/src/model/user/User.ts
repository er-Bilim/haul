import {
  Document,
  model,
  Schema,
  type HydratedDocument,
  type Model,
} from 'mongoose';
import regex from './validation/regex.ts';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import config from '../../config.ts';
import type { UserMethods } from './model.types.ts';
import type { IUser } from '../../types/user/user.types.ts';

type UserModel = Model<IUser, {}, UserMethods>;

const UserSchema = new Schema<HydratedDocument<IUser>, UserModel, UserMethods>({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email: string) => {
        return regex.email.test(email);
      },
      message: 'Invalid email address',
    },
  },
  displayName: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => {
        return regex.displayName.test(value);
      },
      message: 'Invalid display name',
    },
  },
  avatar: {
    type: String,
    required: false,
    default: null,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  refreshToken: {
    type: String,
  },
  establishments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Establishment',
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  images: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Image',
    },
  ],
});

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const hash = await argon2.hash(this.password);
  return (this.password = hash);
});

UserSchema.set('toJSON', {
  transform(_doc, ret, _options) {
    const { password, __v, refreshToken, ...user } = ret;
    return user;
  },
});

UserSchema.methods.checkPassword = function (password: string) {
  return argon2.verify(this.password, password);
};

UserSchema.methods.generateRefreshToken = function () {
  const refreshToken = jwt.sign({ _id: this._id }, config.refreshJWTSecret, {
    expiresIn: '7d',
  });

  this.refreshToken = refreshToken;
  return refreshToken;
};

UserSchema.methods.generateAccessToken = function () {
  const accessToken = jwt.sign({ _id: this._id }, config.accessJWTSecret, {
    expiresIn: '15m',
  });

  return accessToken;
};

UserSchema.path('email').validate({
  validator: async function (this: Document, email) {
    if (!this.isModified('email')) return true;

    const user = await User.exists({ email });

    return !user;
  },

  message: 'User already exists',
});

const User = model('User', UserSchema);

export default User;
