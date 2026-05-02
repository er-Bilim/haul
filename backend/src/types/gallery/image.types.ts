import type { Types } from 'mongoose';

export interface IImage {
  url: string | null;
  user: Types.ObjectId;
  establishment: Types.ObjectId;
}