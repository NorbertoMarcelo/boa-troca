import {
  ICreateTradeDTO,
  ITradesRepository,
  IUpdateTradeDTO,
} from '@modules/trades/dtos/ITradeDTO';
import { Trade } from '@modules/trades/entities/Trade';

export class TradesRepositoryInMemory implements ITradesRepository {
  trades: Trade[] = [];

  async findById(id: string): Promise<Trade> {
    return this.trades.find((trade) => trade.id === id);
  }

  async create(data: ICreateTradeDTO): Promise<void> {
    const trade = new Trade();

    Object.assign(trade, {
      ad: data.ad,
      advertiser: data.advertiser,
      customer: data.customer,
      status: data.status,
    });
    this.trades.push(trade);
  }

  async update(data: IUpdateTradeDTO): Promise<void> {
    this.trades.forEach((trade) => {
      if (trade.id === data.id) {
        trade.status = data.status;
      }
    });
  }

  async delete(id: string): Promise<void> {
    this.trades.forEach((trade) => {
      if (trade.id === id) {
        this.trades.splice(this.trades.indexOf(trade), 1);
      }
    });
  }
}
