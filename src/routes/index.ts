import { Router } from 'express';

import { authenticateRoutes } from '@routes/authenticate.routes';
import { usersRoutes } from '@routes/users.routes';
import { adsRouter } from '@routes/ads.routes';

const router = Router();

router.use('/sessions', authenticateRoutes);
router.use('/users', usersRoutes);
router.use('/ads', adsRouter);

export { router };
