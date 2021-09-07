import { Trade } from '../entities/Trade';

export interface ICreateTradeDTO {
  id?: string;
  ad: string;
  advertiser: string;
  customer: string;
  status?: TradeSatus;
}

export interface IUpdateTradeDTO {
  id: string;
  status: TradeSatus;
}

export interface ITradesRepository {
  findById(id: string): Promise<Trade>;
  create(data: ICreateTradeDTO): Promise<void>;
  update(status: IUpdateTradeDTO): Promise<void>;
  delete(id: string): Promise<void>;
}

export enum TradeSatus {
  current = 'current',
  successful = 'successful',
  failed = 'failed',
}
