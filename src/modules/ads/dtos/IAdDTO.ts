import { User } from '@modules/accounts/entities/User';
import { Ad } from '@modules/ads/entities/Ad';

export interface ICreateAdDTO {
  id?: string;
  title: string;
  description: string;
  user: User;
}

export interface IUpdateAdDTO {
  id: string;
  title: string;
  description: string;
}

export interface IAdsRepository {
  findAll(): Promise<Ad[]>;
  findByTitle(title: string): Promise<Ad[]>;
  findById(id: string): Promise<Ad>;
  create(data: ICreateAdDTO): Promise<void>;
  update(data: IUpdateAdDTO): Promise<void>;
  delete(id: string): Promise<void>;
}

export enum AdSatus {
  available = 'available',
  unavailable = 'unavailable',
  concluded = 'concluded',
}

export interface IReadAd {
  title: string;
  description: string;
  user: string;
}
