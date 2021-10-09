import { getRepository, Like, Repository } from 'typeorm';
import {
  IAdsRepository,
  ICreateAdDTO,
  IUpdateAdDTO,
} from '@modules/ads/dtos/IAdDTO';
import { Ad } from '@modules/ads/entities/Ad';

export class AdsRepository implements IAdsRepository {
  private repository: Repository<Ad>;

  constructor() {
    this.repository = getRepository(Ad);
  }

  async findByTitle(title: string): Promise<Ad[]> {
    const ads = await this.repository.find({
      title: Like(`%${title}%`),
    });
    return ads;
  }

  async findById(id: string): Promise<Ad> {
    const ad = await this.repository.findOne({ id });
    return ad;
  }

  async create(data: ICreateAdDTO): Promise<void> {
    const ad = this.repository.create({
      title: data.title,
      description: data.description,
      user: data.user,
    });
    await this.repository.save(ad);
  }

  async update(data: IUpdateAdDTO): Promise<void> {
    await this.repository.update(data.id, {
      title: data.title,
      description: data.description,
    });
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete({ id });
  }
}
