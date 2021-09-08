import {
  IAdsRepository,
  ICreateAdDTO,
  IUpdateAdDTO,
} from '@modules/ads/dtos/IAdDTO';
import { Ad } from '@modules/ads/entities/Ad';

export class AdsRepositoryInMemory implements IAdsRepository {
  ads: Ad[] = [];

  async findByTitle(title: string): Promise<Ad[]> {
    return this.ads.filter((ad) => {
      const containsWord = ad.title.indexOf(title) !== -1;
      if (containsWord) {
        return ad;
      }
    });
  }

  async findById(id: string): Promise<Ad> {
    return this.ads.find((ad) => ad.id === id);
  }

  async create(data: ICreateAdDTO): Promise<void> {
    const ad = new Ad();

    Object.assign(ad, {
      title: data.title,
      description: data.description,
      status: data.status,
    });

    this.ads.push(ad);
  }

  async update(data: IUpdateAdDTO): Promise<void> {
    this.ads.forEach((ad) => {
      if (ad.id === data.id) {
        ad.title = data.title;
        ad.description = data.description;
      }
    });
  }

  async delete(id: string): Promise<void> {
    this.ads.forEach((ad) => {
      if (ad.id === id) {
        this.ads.splice(this.ads.indexOf(ad), 1);
      }
    });
  }
}
