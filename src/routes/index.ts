import { Router } from 'express';
import { usersRoutes } from '@routes/users.routes';
import { authenticateRoutes } from '@routes/authenticate.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/sessions', authenticateRoutes);

export { router };
