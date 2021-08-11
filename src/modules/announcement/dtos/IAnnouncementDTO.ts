export interface ICreateAnnouncementDTO {
  title: string;
  description: string;
  status: string;
}

export interface IAnnouncementsRepository {
  create(data: ICreateAnnouncementDTO): Promise<void>;
}
