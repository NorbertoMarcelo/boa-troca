import { container } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/dtos/IUserDTO';
import { UsersRepository } from '@modules/accounts/repositories/UsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);
