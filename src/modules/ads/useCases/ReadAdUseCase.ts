import { inject, injectable } from 'tsyringe';
import { IAdsRepository, IReadAd } from '@modules/ads/dtos/IAdDTO';
import { AppError } from '@errors/AppError';

@injectable()
export class ReadAdUseCase {
  constructor(
    @inject('AdsRepository')
    private adRepository: IAdsRepository
  ) {}

  async execute(id: string): Promise<IReadAd> {
    const ad = await this.adRepository.findById(id);
    if (!ad) throw new AppError('Ad not found.');

    const readAd: IReadAd = {
      title: ad.title,
      description: ad.description,
      user: ad.user,
    };

    return readAd;
  }
}
