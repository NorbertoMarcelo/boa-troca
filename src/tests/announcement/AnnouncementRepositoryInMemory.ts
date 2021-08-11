import {
  IAnnouncementsRepository,
  ICreateAnnouncementDTO,
} from '@modules/announcement/dtos/IAnnouncementDTO';
import { Announcement } from '@modules/announcement/entities/Announcement';

export class AnnouncementRepositoryInMemory
  implements IAnnouncementsRepository
{
  ad: Announcement[] = [];

  async create(data: ICreateAnnouncementDTO): Promise<void> {
    const ad = new Announcement();

    Object.assign(ad, {
      title: data.title,
      description: data.description,
      status: data.status,
    });

    this.ad.push(ad);
  }
}
