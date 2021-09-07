import { CreateTradeController } from '@modules/trades/controllers/CreateTradeController';
import { EndTradeController } from '@modules/trades/controllers/EndTradeController';
import { Router } from 'express';

const tradesRoutes = Router();

const createTradeController = new CreateTradeController();
const endTradesController = new EndTradeController();

tradesRoutes.post('/create', createTradeController.handle);
tradesRoutes.delete('/end', endTradesController.handle);

export { tradesRoutes };
