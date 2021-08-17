import { Router } from 'express';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { CreateAnnouncementController } from '@modules/announcement/controllers/CreateAnnouncementController';
import { ReadAnnouncementController } from '@modules/announcement/controllers/ReadAnnouncementController';
import { UpdateAnnouncementController } from '@modules/announcement/controllers/UpdateAnnouncementController';

const adsRouter = Router();

const createAdController = new CreateAnnouncementController();
const readAdController = new ReadAnnouncementController();
const updateController = new UpdateAnnouncementController();

// adsRouter.use(ensureAuthenticated);
adsRouter.post('/create', createAdController.handle);
adsRouter.get('/read/:id', readAdController.handle);
adsRouter.put('/update/:id', updateController.handle);

export { adsRouter };
