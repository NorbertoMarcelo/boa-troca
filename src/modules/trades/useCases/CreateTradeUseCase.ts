import { inject, injectable } from 'tsyringe';
import {
  TradeSatus,
  ICreateTradeDTO,
  ITradesRepository,
} from '@modules/trades/dtos/ITradeDTO';
import { IAdsRepository } from '@modules/ads/dtos/IAdDTO';
import { IUsersRepository } from '@modules/accounts/dtos/IUserDTO';
import { AppError } from '@errors/AppError';

@injectable()
export class CreateTradeUseCase {
  constructor(
    @inject('TradesRepository')
    private tradeRepository: ITradesRepository,
    @inject('AdsRepository')
    private adsRepository: IAdsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: ICreateTradeDTO): Promise<void> {
    const ad = await this.adsRepository.findById(data.ad);
    if (!ad) throw new AppError('Ad not found!');

    const advertiser = await this.usersRepository.findById(data.advertiser);
    if (!advertiser) throw new AppError('User not found!');

    const customer = await this.usersRepository.findById(data.customer);
    if (!customer) throw new AppError('User not found!');

    await this.tradeRepository.create({
      ad: data.ad,
      advertiser: data.advertiser,
      customer: data.customer,
      status: TradeSatus.current,
    });
  }
}
