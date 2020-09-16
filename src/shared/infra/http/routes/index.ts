import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import * as swagerDocument from '@shared/infra/services/swagger.json';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import documentsRouter from '@modules/documents/infra/http/routes/documents.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/documents', documentsRouter);
routes.use('/swagger', swaggerUi.serve, swaggerUi.setup(swagerDocument));

export default routes;
