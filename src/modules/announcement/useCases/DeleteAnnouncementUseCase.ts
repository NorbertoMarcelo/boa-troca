import { AppError } from '@errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IAnnouncementsRepository } from '../dtos/IAnnouncementDTO';

@injectable()
export class DeleteAnnouncementUseCase {
  constructor(
    @inject('AnnouncementsRepository')
    private adRepository: IAnnouncementsRepository
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.adRepository.findById(id);

    if (!user) throw new AppError('User not found.');

    await this.adRepository.delete(id);
  }
}
