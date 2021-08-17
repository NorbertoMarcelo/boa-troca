import { CreateAnnouncementUseCase } from '@modules/announcement/useCases/CreateAnnouncementUseCase';
import { ReadAnnouncementUseCase } from '@modules/announcement/useCases/ReadAnnouncementUseCase';
import { AnnouncementRepositoryInMemory } from '../AnnouncementRepositoryInMemory';

describe('Read Ad Use Case', () => {
  let createAdUseCase: CreateAnnouncementUseCase;
  let readAdUseCase: ReadAnnouncementUseCase;
  let adRepositoryInMemory: AnnouncementRepositoryInMemory;

  beforeEach(() => {
    adRepositoryInMemory = new AnnouncementRepositoryInMemory();
    createAdUseCase = new CreateAnnouncementUseCase(adRepositoryInMemory);
    readAdUseCase = new ReadAnnouncementUseCase(adRepositoryInMemory);
  });

  it('should be able to read a ad', async () => {
    await createAdUseCase.execute({
      title: 'Ad Title',
      description: 'The ad description.',
    });

    const ad = await adRepositoryInMemory.findByTitle('Ad Title');

    const read = await readAdUseCase.execute(ad[0].id);

    expect(read.title).toEqual('Ad Title');
    expect(read.description).toEqual('The ad description.');
    expect(read.status).toEqual('available');
  });
});
