import { container } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/dtos/IUserDTO';
import { UsersRepository } from '@modules/accounts/repositories/UsersRepository';
import { IAdsRepository } from '@modules/ads/dtos/IAdDTO';
import { AdsRepository } from '@modules/ads/repositories/AdsRepository';
import { ITradesRepository } from '@modules/trades/dtos/ITradeDTO';
import { TradesRepository } from '@modules/trades/repositories/TradesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IAdsRepository>('AdsRepository', AdsRepository);

container.registerSingleton<ITradesRepository>(
  'TradesRepository',
  TradesRepository
);
