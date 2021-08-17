import { Announcement } from '@modules/announcement/entities/Announcement';

export interface ICreateAnnouncementDTO {
  title: string;
  description: string;
  status?: AnnouncementSatus;
  id?: string;
}

export interface IAnnouncementsRepository {
  findByTitle(title: string): Promise<Announcement[]>;
  findById(id: string): Promise<Announcement>;
  create(data: ICreateAnnouncementDTO): Promise<void>;
}

export enum AnnouncementSatus {
  available = 'available',
  unavailable = 'unavailable',
  concluded = 'concluded',
}
