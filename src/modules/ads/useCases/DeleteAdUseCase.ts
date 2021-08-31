import { inject, injectable } from 'tsyringe';
import { IAdsRepository } from '@modules/ads/dtos/IAdDTO';
import { AppError } from '@errors/AppError';

@injectable()
export class DeleteAdUseCase {
  constructor(
    @inject('AdsRepository')
    private adsRepository: IAdsRepository
  ) {}

  async execute(id: string): Promise<void> {
    const ad = await this.adsRepository.findById(id);
    if (!ad) throw new AppError('Announcement not found.');

    try {
      await this.adsRepository.delete(id);
    } catch (error) {
      throw new AppError('Could not run.', 500);
    }
  }
}
