import { Router } from 'express';

import { CreateAdController } from '@modules/ads/controllers/CreateAdController';
import { ReadAdController } from '@modules/ads/controllers/ReadAdController';
import { UpdateAdController } from '@modules/ads/controllers/UpdateAdController';
import { DeleteAdController } from '@modules/ads/controllers/DeleteAdController';

import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';

const adsRouter = Router();

const createAdController = new CreateAdController();
const readAdController = new ReadAdController();
const updateController = new UpdateAdController();
const deleteAdController = new DeleteAdController();

adsRouter.use(ensureAuthenticated);

adsRouter.post('/create', createAdController.handle);
adsRouter.get('/read/:id', readAdController.handle);
adsRouter.put('/update/:id', updateController.handle);
adsRouter.delete('/delete/:id', deleteAdController.handle);

export { adsRouter };
