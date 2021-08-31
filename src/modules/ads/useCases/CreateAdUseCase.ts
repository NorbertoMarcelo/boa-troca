import { inject, injectable } from 'tsyringe';
import {
  AdSatus,
  IAdsRepository,
  ICreateAdDTO,
} from '@modules/ads/dtos/IAdDTO';

@injectable()
export class CreateAdUseCase {
  constructor(
    @inject('AdsRepository')
    private adsRepository: IAdsRepository
  ) {}

  async execute(data: ICreateAdDTO): Promise<void> {
    await this.adsRepository.create({
      title: data.title,
      description: data.description,
      status: AdSatus.available,
      user: data.user,
    });
  }
}
