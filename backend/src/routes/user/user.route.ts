import { Router } from 'express';
import { avatarUpload } from '../../middlewares/multer.ts';
import auth from '../../middlewares/auth.ts';
import UsersController from '../../controllers/users/users.controller.ts';

const usersRouter = Router();

usersRouter.post(
  '/',
  avatarUpload.single('avatar'),
  UsersController.registration,
);

usersRouter.post('/sessions', UsersController.authentication);
usersRouter.delete('/sessions', auth, UsersController.logout);
usersRouter.post('/token', UsersController.token);

export default usersRouter;
