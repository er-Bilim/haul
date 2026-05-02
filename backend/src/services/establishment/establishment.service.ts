import type { Types } from 'mongoose';
import { Establishment } from '../../model/establishment/Establishment.ts';
import type { IEstablishmentSave } from '../../types/establishment/establishment.types.ts';
import type { IReview } from '../../types/review/review.types.ts';
import calculateRatings from '../../utils/calcRatings.ts';
import User from '../../model/user/User.ts';

const EstablishmentService = {
  getAll: async () => {
    const establishments = await Establishment.find().populate<{
      reviews: IReview[];
    }>('reviews');

    return establishments.map((establishment) => {
      const ratings = calculateRatings(establishment.reviews);
      return { ...establishment.toObject(), ratings };
    });
  },

  getEstablishmentByID: async (id: string) => {
    const establishment = await Establishment.findById(id).populate<{
      reviews: IReview[];
    }>('reviews images');

    if (!establishment) return null;

    const ratings = calculateRatings(establishment.reviews);

    return { ...establishment.toObject(), ratings };
  },

  create: async (data: IEstablishmentSave) => {
    const establishment = new Establishment(data);
    establishment.populate('owner', 'displayName avatar');
    return await establishment.save();
  },

  delete: async (id: string) => {
    const deletedEstablished = await Establishment.findByIdAndDelete(id);

    await User.findByIdAndUpdate(deletedEstablished?.owner, {
      $pull: { establishments: deletedEstablished?._id },
    });
    return deletedEstablished;
  },

  updateReviews: async (id: Types.ObjectId, reviewID: Types.ObjectId) => {
    await Establishment.findByIdAndUpdate(id, {
      $push: { reviews: reviewID },
    });
  },
};

export default EstablishmentService;
