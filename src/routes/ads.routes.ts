import { Router } from 'express';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';

const adsRouter = Router();

adsRouter.use(ensureAuthenticated);

export { adsRouter };
