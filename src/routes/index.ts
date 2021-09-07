import { Router } from 'express';

import { authenticateRoutes } from '@routes/authenticate.routes';
import { usersRoutes } from '@routes/users.routes';
import { adsRouter } from '@routes/ads.routes';
import { tradesRoutes } from './trades.routes';

const router = Router();

router.use('/sessions', authenticateRoutes);
router.use('/users', usersRoutes);
router.use('/ads', adsRouter);
router.use('/trades', tradesRoutes);

export { router };
