import { container } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/dtos/IUserDTO';
import { UsersRepository } from '@modules/accounts/repositories/UsersRepository';
import { IAnnouncementsRepository } from '@modules/announcement/dtos/IAnnouncementDTO';
import { AnnouncementsRepository } from '@modules/announcement/repositories/AnnouncementsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IAnnouncementsRepository>(
  'AnnouncementsRepository',
  AnnouncementsRepository
);
