import { Schema, model } from 'mongoose';

const ImageSchema = new Schema({
  url: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  establishment: {
    type: Schema.Types.ObjectId,
    ref: 'Establishment',
    required: true,
  },
});

export const Image = model('Image', ImageSchema);
