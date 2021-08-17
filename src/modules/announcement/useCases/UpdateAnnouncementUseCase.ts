import {
  AnnouncementSatus,
  IAnnouncementsRepository,
  ICreateAnnouncementDTO,
} from '@modules/announcement/dtos/IAnnouncementDTO';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdateAnnouncementUseCase {
  constructor(
    @inject('AnnouncementsRepository')
    private adRepository: IAnnouncementsRepository
  ) {}

  async execute(id: string, data: ICreateAnnouncementDTO): Promise<void> {
    await this.adRepository.update(id, {
      title: data.title,
      description: data.description,
      status: data.status || AnnouncementSatus.available,
    });
  }
}
