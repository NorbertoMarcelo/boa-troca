import { CreateTradeUseCase } from '@modules/trades/useCases/CreateTradeUseCase';
import { UsersRepositoryInMemory } from '@tests/accaunts/UserRepositoryInMemory';
import { AdsRepositoryInMemory } from '@tests/ads/AdsRepositoryInMemory';
import { TradesRepositoryInMemory } from '../TradesRepositoryInMemory';

describe('Create Trade Use Case', () => {
  let createTradeUseCase: CreateTradeUseCase;
  let tradesRepositoryInMemory: TradesRepositoryInMemory;
  let adsRepositoryInMemory: AdsRepositoryInMemory;
  let usersRepositoryInMemory: UsersRepositoryInMemory;

  beforeEach(() => {
    tradesRepositoryInMemory = new TradesRepositoryInMemory();
    adsRepositoryInMemory = new AdsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createTradeUseCase = new CreateTradeUseCase(
      tradesRepositoryInMemory,
      adsRepositoryInMemory,
      usersRepositoryInMemory
    );
  });
});
