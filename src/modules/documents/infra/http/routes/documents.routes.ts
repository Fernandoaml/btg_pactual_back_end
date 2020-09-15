import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import DocumentsController from '@modules/documents/infra/http/controller/DocumentsController';

const documentRouter = Router();
const documentsController = new DocumentsController();

documentRouter.use(ensureAuthenticated);
documentRouter.post('/', documentsController.create);

export default documentRouter;
