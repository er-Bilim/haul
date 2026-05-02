import { Schema, model } from 'mongoose';

const ReviewSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    qualityOfFood: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    serviceQuality: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    interior: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    establishment: {
      type: Schema.Types.ObjectId,
      ref: 'Establishment',
    },
  },
  { timestamps: true },
);

export const Review = model('Review', ReviewSchema);
