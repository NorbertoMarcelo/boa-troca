import { AppError } from '@errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ITradesRepository, IUpdateTradeDTO } from '../dtos/ITradeDTO';

@injectable()
export class EndTradeUseCase {
  constructor(
    @inject('TradesRepository')
    private tradeRepository: ITradesRepository
  ) {}

  async execute(data: IUpdateTradeDTO): Promise<void> {
    const trade = await this.tradeRepository.findById(data.id);
    if (!trade) throw new AppError('Trade not found!');

    await this.tradeRepository.update({
      id: data.id,
      status: data.status,
    });

    await this.tradeRepository.delete(data.id);
  }
}
