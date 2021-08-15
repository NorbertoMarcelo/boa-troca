import { Router } from 'express';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { CreateAnnouncementController } from '@modules/announcement/controllers/CreateAnnouncementController';

const adsRouter = Router();

const createAdController = new CreateAnnouncementController();

// adsRouter.use(ensureAuthenticated);
adsRouter.post('/create', createAdController.handle);

export { adsRouter };
