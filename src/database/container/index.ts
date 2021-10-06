import { container } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/dtos/IUserDTO';
import { UsersRepository } from '@modules/accounts/repositories/UsersRepository';
import { IAdsRepository } from '@modules/ads/dtos/IAdDTO';
import { AdsRepository } from '@modules/ads/repositories/AdsRepository';
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IAdsRepository>('AdsRepository', AdsRepository);
