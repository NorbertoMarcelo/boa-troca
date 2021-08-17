import { inject, injectable } from 'tsyringe';
import { IAnnouncementsRepository } from '../dtos/IAnnouncementDTO';
import { Announcement } from '../entities/Announcement';

@injectable()
export class ReadAnnouncementUseCase {
  constructor(
    @inject('AnnouncementsRepository')
    private adRepository: IAnnouncementsRepository
  ) {}

  async execute(id: string): Promise<Announcement> {
    const ad = await this.adRepository.findById(id);

    return ad;
  }
}
