import type { NextFunction, Request, Response } from 'express';
import type { IReviewSave } from '../../types/review/review.types.ts';
import type { RequestWithUser } from '../../middlewares/auth.ts';
import ReviewService from '../../services/review/review.service.ts';
import User from '../../model/user/User.ts';
import EstablishmentService from '../../services/establishment/establishment.service.ts';
import UsersService from '../../services/users/users.service.ts';
import isValidationError from '../../utils/validationError.ts';
import { isValidObjectId, Types } from 'mongoose';

const ReviewController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const establishmentID = req.params.id as string;

    try {
      const { user } = req as RequestWithUser;

      if (!isValidObjectId(establishmentID)) {
        return res.status(400).json({
          error: 'Invalid establishment id',
        });
      }

      const establishment =
        await EstablishmentService.getEstablishmentByID(establishmentID);

      if (!establishment) {
        return res.status(404).json({
          error: 'Establishment not found',
        });
      }

      const body: IReviewSave = req.body;

      const establishedObjectID = new Types.ObjectId(establishmentID);
      const correctData: IReviewSave = {
        text: body.text,
        qualityOfFood: Number(body.qualityOfFood),
        serviceQuality: Number(body.serviceQuality),
        interior: Number(body.interior),
        author: user._id,
        establishment: establishedObjectID,
      };

      const review = await ReviewService.create(correctData);
      await User.findByIdAndUpdate(user._id, {
        $push: { reviews: review._id },
      });
      await EstablishmentService.updateReviews(establishedObjectID, review._id);
      await UsersService.updateReviews(user._id, review._id);

      return res.json({
        message: 'Review accepted',
        review,
      });
    } catch (error) {
      if (isValidationError(error)) {
        res.status(400).json({ error: isValidationError(error) });
      }

      return next(error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.reviewId as string;

    if (!id) {
      return res.status(400).json({
        error: 'Invalid id',
      });
    }
    try {
      const deletedReview = await ReviewService.delete(id);

      if (deletedReview === null) {
        return res.status(404).json({
          error: 'Review not found',
        });
      }

      return res.json({
        message: 'Review deleted!',
      });
    } catch (error) {
      if (isValidationError(error)) {
        res.status(400).json({ error: isValidationError(error) });
      }

      return next(error);
    }
  },
};

export default ReviewController;
