import type { NextFunction, Request, Response } from 'express';
import type { RequestWithUser } from '../../middlewares/auth.ts';
import isValidationError from '../../utils/validationError.ts';
import { isValidObjectId, Types } from 'mongoose';
import EstablishmentService from '../../services/establishment/establishment.service.ts';

import ImageService from '../../services/gallery/image.service.ts';
import deleteImage from '../../utils/deleteImage.ts';

const ImageController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const establishmentID = req.params.id as string;

    try {
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

      const { user } = req as RequestWithUser;

      const url = req.file
        ? `uploads/reviews/images/${req.file.filename}`
        : null;

      const establishedObjectID = new Types.ObjectId(establishmentID);
      const correctData = {
        url,
        user: user._id,
        establishment: establishedObjectID,
      };

      const image = await ImageService.create(correctData);
      return res.json({
        message: 'Created successfully!',
        image,
      });
    } catch (error) {
      if (isValidationError(error)) {
        res.status(400).json({ error: isValidationError(error) });
      }

      return next(error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.imageId as string;

    if (!id) {
      return res.status(400).json({
        error: 'Invalid id',
      });
    }
    try {
      const deletedImage = await ImageService.delete(id);

      if (!deletedImage) {
        return res.status(404).json({
          error: 'Image not found',
        });
      }

      deleteImage({ image: deletedImage.toObject().url });
      return res.json({
        message: 'Image deleted!',
      });
    } catch (error) {
      if (isValidationError(error)) {
        res.status(400).json({ error: isValidationError(error) });
      }

      return next(error);
    }
  },
};

export default ImageController;
