import { inject, injectable } from 'tsyringe';
import { IAdsRepository } from '@modules/ads/dtos/IAdDTO';
import { Ad } from '../entities/Ad';

@injectable()
export class ListAdsUseCase {
  constructor(
    @inject('AdsRepository')
    private adRepository: IAdsRepository
  ) {}

  async execute(): Promise<Ad[]> {
    const listAds = this.adRepository.findAll();

    return listAds;
  }
}
