import type { Types } from 'mongoose';

export interface IReview {
  _id: Types.ObjectId;
  text: string;
  qualityOfFood: number;
  serviceQuality: number;
  interior: number;
  author: Types.ObjectId;
  establishment: Types.ObjectId;
}
