import mongoose, { Schema, model, Types } from 'mongoose';

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
    default: null,
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

EstablishmentSchema.pre('findOneAndDelete', async function () {
  const establishment = await this.model.findOne(this.getQuery());
  if (!establishment) return;

  try {
    const reviews = await mongoose
      .model('Review')
      .find({ establishment: establishment._id });
    const images = await mongoose
      .model('Image')
      .find({ establishment: establishment._id });

    const reviewIds = reviews.map((review) => review._id);
    const imageIds = images.map((image) => image._id);

    await mongoose
      .model('User')
      .updateMany(
        { reviews: { $in: reviewIds } },
        { $pull: { reviews: { $in: reviewIds } } },
      );

    await mongoose
      .model('User')
      .updateMany(
        { images: { $in: imageIds } },
        { $pull: { images: { $in: imageIds } } },
      );

    await mongoose.model('User').findByIdAndUpdate(establishment.owner, {
      $pull: { establishments: establishment._id },
    });

    await mongoose
      .model('Review')
      .deleteMany({ establishment: establishment._id });
    await mongoose
      .model('Image')
      .deleteMany({ establishment: establishment._id });
  } catch (error) {
    console.error(error);
  }
});

export const Establishment = model('Establishment', EstablishmentSchema);
