import type { NextFunction, Request, Response } from 'express';
import EstablishmentService from '../../services/establishment/establishment.service.ts';
import { isValidObjectId } from 'mongoose';
import isValidationError from '../../utils/validationError.ts';
import deleteImage from '../../utils/deleteImage.ts';
import type { RequestWithUser } from '../../middlewares/auth.ts';
import User from '../../model/user/User.ts';

const EstablishmentController = {
  getAll: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const establishments = await EstablishmentService.getAll();
      return res.json(establishments);
    } catch (error) {
      next(error);
    }
  },

  getEstablishmentByID: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.params.id as string;

      if (!isValidObjectId(id)) {
        return res.status(400).json({
          error: 'Invalid establishment id',
        });
      }

      const establishment = await EstablishmentService.getEstablishmentByID(id);
      return establishment;
    } catch (error) {
      return next(error);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req as RequestWithUser;
    const body = req.body;

    const mainPhoto = req.file
      ? `uploads/establishment/${req.file.filename}`
      : null;

    const correctData = {
      name: body.name,
      description: body.description,
      mainPhoto: mainPhoto,
      owner: user._id,
    };

    if (!body.terms || body.terms !== 'true') {
      if (correctData.mainPhoto)
        await deleteImage({ image: correctData.mainPhoto });
      return res.status(400).json({ error: 'You must agree to the terms' });
    }

    try {
      const establishment = await EstablishmentService.create(correctData);
      await User.findByIdAndUpdate(user._id, {
        $push: { establishments: establishment._id },
      });
      return res.json({
        message: 'Created successfully!',
        establishment,
      });
    } catch (error) {
      if (correctData.mainPhoto)
        await deleteImage({ image: correctData.mainPhoto });

      if (isValidationError(error)) {
        res.status(400).json({ error: isValidationError(error) });
      }

      return next(error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;

      if (!isValidObjectId(id)) {
        return res.status(400).json({
          error: 'Invalid establishment id',
        });
      }

      const deletedEstablished = await EstablishmentService.delete(id);

      if (!deletedEstablished) {
        return res.status(404).json({
          error: 'Established not found',
        });
      }

      return res.json({
        message: 'Established deleted!',
      });
    } catch (error) {
      if (isValidationError(error)) {
        res.status(400).json({ error: isValidationError(error) });
      }

      return next(error);
    }
  },
};

export default EstablishmentController;
