import { getRepository, Like, Repository } from 'typeorm';
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

  async findByTitle(title: string): Promise<Announcement[]> {
    const ads = await this.repository.find({
      title: Like(`%${title}%`),
    });

    return ads;
  }

  async findById(id: string): Promise<Announcement> {
    const ad = await this.repository.findOne({ id });

    return ad;
  }

  async create(data: ICreateAnnouncementDTO): Promise<void> {
    const ad = this.repository.create({
      title: data.title,
      description: data.description,
      status: data.status,
    });

    await this.repository.save(ad);
  }

  async update(id: string, data: ICreateAnnouncementDTO): Promise<void> {
    await this.repository.update(id, {
      title: data.title,
      description: data.description,
      status: data.status,
    });
  }
}
