import { Router } from 'express';

import UsersController from '@modules/users/infra/http/controller/UsersController';
import captureIP from '@modules/users/infra/http/middlewares/captureIP';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', captureIP, usersController.create);

export default usersRouter;
