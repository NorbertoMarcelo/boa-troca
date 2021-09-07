import { getRepository, Repository } from 'typeorm';
import {
  ICreateTradeDTO,
  ITradesRepository,
  IUpdateTradeDTO,
} from '@modules/trades/dtos/ITradeDTO';
import { Trade } from '@modules/trades/entities/Trade';

export class TradesRepository implements ITradesRepository {
  private repository: Repository<Trade>;

  constructor() {
    this.repository = getRepository(Trade);
  }

  async findById(id: string): Promise<Trade> {
    const trade = await this.repository.findOne({ id });
    return trade;
  }

  async create(data: ICreateTradeDTO): Promise<void> {
    const trade = this.repository.create({
      ad: data.ad,
      advertiser: data.advertiser,
      customer: data.customer,
      status: data.status,
    });
    await this.repository.save(trade);
  }

  async update(data: IUpdateTradeDTO): Promise<void> {
    await this.repository.update(data.id, {
      status: data.status,
    });
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete({ id });
  }
}
