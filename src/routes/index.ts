import { Router } from 'express';
import { usersRoutes } from '@routes/users.routes';
import { authenticateRoutes } from '@routes/authenticate.routes';
import { adsRouter } from '@routes/ads.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/sessions', authenticateRoutes);
router.use('/ads', adsRouter);

export { router };
