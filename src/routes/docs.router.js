import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import { swaggerSpec } from '../docs/swagger.js';

const router = Router();

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;