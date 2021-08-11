import { CreateAnnouncementUseCase } from '@modules/announcement/useCases/CreateAnnouncementUseCase';
import { AnnouncementRepositoryInMemory } from '../AnnouncementRepositoryInMemory';

describe('Create Announcement Use Case', () => {
  let createAdUseCase: CreateAnnouncementUseCase;
  let adRepositoryInMemory: AnnouncementRepositoryInMemory;

  beforeEach(() => {
    adRepositoryInMemory = new AnnouncementRepositoryInMemory();
    createAdUseCase = new CreateAnnouncementUseCase(adRepositoryInMemory);
  });

  it('should be able to crate a new ad', async()=>{
    await
  })
});
