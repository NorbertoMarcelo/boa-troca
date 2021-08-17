import { UpdateUserUseCase } from '@modules/accounts/useCases/UpdateUserUseCase';
import { CreateAnnouncementUseCase } from '@modules/announcement/useCases/CreateAnnouncementUseCase';
import { ReadAnnouncementUseCase } from '@modules/announcement/useCases/ReadAnnouncementUseCase';
import { UpdateAnnouncementUseCase } from '@modules/announcement/useCases/UpdateAnnouncementUseCase';
import { AnnouncementRepositoryInMemory } from '../AnnouncementRepositoryInMemory';

describe('Update Ad Use Case', () => {
  let createAdUseCase: CreateAnnouncementUseCase;
  let updateAdUseCase: UpdateAnnouncementUseCase;
  let adRepositoryInMemory: AnnouncementRepositoryInMemory;

  beforeEach(() => {
    adRepositoryInMemory = new AnnouncementRepositoryInMemory();
    createAdUseCase = new CreateAnnouncementUseCase(adRepositoryInMemory);
    updateAdUseCase = new UpdateAnnouncementUseCase(adRepositoryInMemory);
  });

  it('should be able update ad data', async () => {
    await createAdUseCase.execute({
      title: 'Ad Title',
      description: 'The ad description.',
    });

    const ad = await adRepositoryInMemory.findByTitle('Ad Title');

    const update = await updateAdUseCase.execute(ad[0].id, {
      title: 'Outher Ad Title',
      description: 'Outher ad description.',
    });

    expect(ad[0].title).toEqual('Outher Ad Title');
    expect(ad[0].description).toEqual('Outher ad description.');
    expect(ad[0].status).toEqual('available');
  });
});
