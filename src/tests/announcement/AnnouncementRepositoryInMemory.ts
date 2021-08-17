import {
  IAnnouncementsRepository,
  ICreateAnnouncementDTO,
} from '@modules/announcement/dtos/IAnnouncementDTO';
import { Announcement } from '@modules/announcement/entities/Announcement';

export class AnnouncementRepositoryInMemory
  implements IAnnouncementsRepository
{
  ads: Announcement[] = [];

  async findByTitle(title: string): Promise<Announcement[]> {
    return this.ads.filter((ad) => {
      const containsWord = ad.title.indexOf(title) !== -1;
      if (containsWord) {
        return ad;
      }
    });
  }

  async findById(id: string): Promise<Announcement> {
    return this.ads.find((ad) => ad.id === id);
  }

  async create(data: ICreateAnnouncementDTO): Promise<void> {
    const ad = new Announcement();

    Object.assign(ad, {
      title: data.title,
      description: data.description,
      status: data.status,
    });

    this.ads.push(ad);
  }
}
