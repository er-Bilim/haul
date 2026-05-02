import { Router } from 'express';
import EstablishmentController from '../../controllers/establishment/establishment.controller.ts';
import auth from '../../middlewares/auth.ts';
import { establishmentUpload } from '../../middlewares/multer.ts';
import permit from '../../middlewares/permit.ts';
import ReviewController from '../../controllers/review/review.controller.ts';

const establishmentsRouter = Router();

establishmentsRouter.get('/', EstablishmentController.getAll);
establishmentsRouter.get('/:id', EstablishmentController.getEstablishmentByID);
establishmentsRouter.post(
  '/',
  auth,
  establishmentUpload.single('mainPhoto'),
  EstablishmentController.create,
);

establishmentsRouter.delete(
  '/:id',
  auth,
  permit('admin'),
  EstablishmentController.delete,
);

establishmentsRouter.post('/:id/reviews', auth, ReviewController.create);

establishmentsRouter.delete(
  '/reviews/:id',
  auth,
  permit('admin'),
  ReviewController.delete,
);

export default establishmentsRouter;
