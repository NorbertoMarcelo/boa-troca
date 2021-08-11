import { getRepository, Repository } from 'typeorm';
import {
  IAnnouncementsRepository,
  ICreateAnnouncementDTO,
} from '@modules/announcement/dtos/IAnnouncementDTO';
import { Announcement } from '@modules/announcement/entities/Announcement';

export class AnnouncementsRepository implements IAnnouncementsRepository {
  private repository: Repository<Announcement>;

  constructor() {
    this.repository = getRepository(Announcement);
  }

  async create(data: ICreateAnnouncementDTO): Promise<void> {
    const ad = this.repository.create({
      title: data.title,
      description: data.description,
      status: data.status,
    });

    await this.repository.save(ad);
  }
}
