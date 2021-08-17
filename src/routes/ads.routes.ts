import { Router } from 'express';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { CreateAnnouncementController } from '@modules/announcement/controllers/CreateAnnouncementController';
import { ReadAnnouncementController } from '@modules/announcement/controllers/ReadAnnouncementController';

const adsRouter = Router();

const createAdController = new CreateAnnouncementController();
const readAdController = new ReadAnnouncementController();

// adsRouter.use(ensureAuthenticated);
adsRouter.post('/create', createAdController.handle);
adsRouter.get('/read/:id', readAdController.handle);

export { adsRouter };
