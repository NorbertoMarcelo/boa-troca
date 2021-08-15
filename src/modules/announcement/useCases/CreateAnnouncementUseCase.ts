import {
  AnnouncementSatus,
  IAnnouncementsRepository,
  ICreateAnnouncementDTO,
} from '@modules/announcement/dtos/IAnnouncementDTO';
import { date } from 'joi';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateAnnouncementUseCase {
  constructor(
    @inject('AnnouncementsRepository')
    private adRepository: IAnnouncementsRepository
  ) {}

  async execute(data: ICreateAnnouncementDTO): Promise<void> {
    await this.adRepository.create({
      title: data.title,
      description: data.description,
      status: data.status || AnnouncementSatus.available,
    });
  }
}
