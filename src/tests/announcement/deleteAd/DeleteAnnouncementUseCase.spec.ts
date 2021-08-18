import { CreateAnnouncementUseCase } from '@modules/announcement/useCases/CreateAnnouncementUseCase';
import { DeleteAnnouncementUseCase } from '@modules/announcement/useCases/DeleteAnnouncementUseCase';
import { AnnouncementRepositoryInMemory } from '../AnnouncementRepositoryInMemory';

describe('Delete Ad Use Case', () => {
  let createAdUseCase: CreateAnnouncementUseCase;
  let deleteAdUseCase: DeleteAnnouncementUseCase;
  let adRepositoryInMemory: AnnouncementRepositoryInMemory;

  beforeEach(() => {
    adRepositoryInMemory = new AnnouncementRepositoryInMemory();
    createAdUseCase = new CreateAnnouncementUseCase(adRepositoryInMemory);
    deleteAdUseCase = new DeleteAnnouncementUseCase(adRepositoryInMemory);
  });

  it('shoud be able to nelete a user', async () => {
    await createAdUseCase.execute({
      title: 'Ad Title',
      description: 'The ad description.',
    });

    const ad = await adRepositoryInMemory.findByTitle('Ad Title');

    const del = await deleteAdUseCase.execute(ad[0].id);

    const ad2 = await adRepositoryInMemory.findById(ad[0].id);

    expect(ad2).toBeUndefined();
  });
});
