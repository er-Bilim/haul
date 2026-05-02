import { Establishment } from '../../model/establishment/Establishment.ts';
import type { IEstablishmentSave } from '../../types/establishment/establishment.types.ts';
import type { IReview } from '../../types/review/review.types.ts';
import calculateRatings from '../../utils/calcRatings.ts';

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
    const establishment = await Establishment.findById(id).populate(
      'reviews',
      'images',
    );
    return establishment;
  },

  create: async (data: IEstablishmentSave) => {
    const establishment = new Establishment(data);
    establishment.populate('owner', 'displayName avatar');
    return await establishment.save();
  },

  delete: async (id: string) => {
    const deletedEstablished = await Establishment.findByIdAndDelete(id);
    return deletedEstablished;
  },
};

export default EstablishmentService;
