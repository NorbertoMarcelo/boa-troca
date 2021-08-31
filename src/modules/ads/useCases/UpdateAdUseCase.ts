import { inject, injectable } from 'tsyringe';
import { IAdsRepository, IUpdateAdDTO } from '@modules/ads/dtos/IAdDTO';

@injectable()
export class UpdateAdUseCase {
  constructor(
    @inject('AdsRepository')
    private adsRepository: IAdsRepository
  ) {}

  async execute(data: IUpdateAdDTO): Promise<void> {
    await this.adsRepository.update({
      id: data.id,
      title: data.title,
      description: data.description,
    });
  }
}
