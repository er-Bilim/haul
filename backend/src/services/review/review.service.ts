import { Establishment } from '../../model/establishment/Establishment.ts';
import { Review } from '../../model/review/Review.ts';
import User from '../../model/user/User.ts';
import type { IReviewSave } from '../../types/review/review.types.ts';

const ReviewService = {
  create: async (data: IReviewSave) => {
    const review = new Review(data);
    return await review.save();
  },
  delete: async (id: string) => {
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) return null;

    await Establishment.findByIdAndUpdate(deletedReview.establishment, {
      $pull: { reviews: deletedReview._id },
    });

    await User.findByIdAndUpdate(deletedReview.author, {
      $pull: { reviews: deletedReview._id },
    });
  },
};

export default ReviewService;
