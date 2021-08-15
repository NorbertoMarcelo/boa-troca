import { getRepository, Like, Repository } from 'typeorm';
import {
  AnnouncementSatus,
  IAnnouncementsRepository,
  ICreateAnnouncementDTO,
} from '@modules/announcement/dtos/IAnnouncementDTO';
import { Announcement } from '@modules/announcement/entities/Announcement';

export class AnnouncementsRepository implements IAnnouncementsRepository {
  private repository: Repository<Announcement>;

  constructor() {
    this.repository = getRepository(Announcement);
  }

  async findByTitle(title: string): Promise<Announcement[]> {
    const ads = await this.repository.find({
      title: Like(`%${title}%`),
    });

    return ads;
  }

  async create(data: ICreateAnnouncementDTO): Promise<void> {
    const ad = this.repository.create({
      title: data.title,
      description: data.description,
      status: data.status || AnnouncementSatus.available,
    });

    await this.repository.save(ad);
  }
}
