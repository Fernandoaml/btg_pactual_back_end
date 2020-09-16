import { Router } from 'express';

import SessionController from '@modules/users/infra/http/controller/SessionController';
import captureIP from '@modules/users/infra/http/middlewares/captureIP';

const sessionsRouter = Router();
const sessionController = new SessionController();

sessionsRouter.post('/', captureIP, sessionController.create);

export default sessionsRouter;
