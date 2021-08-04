import { Router } from 'express';
import { CreateUserController } from '@modules/accounts/controllers/CreateUserController';
import { ReadUserController } from '@modules/accounts/controllers/ReadUserController';
import { DeleteUserController } from '@modules/accounts/controllers/DeleteUserController';
import { UpdateUserController } from '@modules/accounts/controllers/UpdateUserController';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const readUserController = new ReadUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

usersRoutes.post('/create', createUserController.handle);
usersRoutes.get('/read', readUserController.handle);
usersRoutes.post('/update', updateUserController.handle);
usersRoutes.delete('/delete', deleteUserController.handle);

export { usersRoutes };
