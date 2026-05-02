import { Router } from 'express';
import usersRouter from './user/user.route.ts';
import establishmentsRouter from './establishment/establishment.route.ts';

const apiRouter = Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/establishments', establishmentsRouter);

export default apiRouter;
