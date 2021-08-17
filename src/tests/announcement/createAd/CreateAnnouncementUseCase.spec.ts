import { CreateAnnouncementUseCase } from '@modules/announcement/useCases/CreateAnnouncementUseCase';
import { AnnouncementRepositoryInMemory } from '@tests/announcement/AnnouncementRepositoryInMemory';

describe('Create Announcement Use Case', () => {
  let createAdUseCase: CreateAnnouncementUseCase;
  let adRepositoryInMemory: AnnouncementRepositoryInMemory;

  beforeEach(() => {
    adRepositoryInMemory = new AnnouncementRepositoryInMemory();
    createAdUseCase = new CreateAnnouncementUseCase(adRepositoryInMemory);
  });

  it('should be able to crate a new ad', async () => {
    await createAdUseCase.execute({
      title: 'Ad Title',
      description: 'The ad description.',
    });

    const ad = await adRepositoryInMemory.findByTitle('Ad Title');

    expect(ad[0].title).toEqual('Ad Title');
    expect(ad[0].description).toEqual('The ad description.');
    expect(ad[0].status).toEqual('available');
  });
});
