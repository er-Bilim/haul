import { Schema, model, Types } from 'mongoose';

const EstablishmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  mainPhoto: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  images: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Image',
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

export const Establishment = model('Establishment', EstablishmentSchema);
