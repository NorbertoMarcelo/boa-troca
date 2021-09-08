import { CreateAdUseCase } from '@modules/ads/useCases/CreateAdUseCase';
import { UpdateAdUseCase } from '@modules/ads/useCases/UpdateAdUseCase';
import { AdsRepositoryInMemory } from '../AdsRepositoryInMemory';

describe('Update Ad Use Case', () => {
  let createAdUseCase: CreateAdUseCase;
  let updateAdUseCase: UpdateAdUseCase;
  let adsRepositoryInMemory: AdsRepositoryInMemory;

  beforeEach(() => {
    adsRepositoryInMemory = new AdsRepositoryInMemory();
    createAdUseCase = new CreateAdUseCase(adsRepositoryInMemory);
    updateAdUseCase = new UpdateAdUseCase(adsRepositoryInMemory);
  });

  it('should be able update ad data', async () => {
    await createAdUseCase.execute({
      title: 'Ad Title',
      description: 'The ad description.',
    });

    const ad = await adsRepositoryInMemory.findByTitle('Ad Title');

    await updateAdUseCase.execute({
      id: ad[0].id,
      title: 'Outher Ad Title',
      description: 'Outher ad description.',
    });

    expect(ad[0].title).toEqual('Outher Ad Title');
    expect(ad[0].description).toEqual('Outher ad description.');
    expect(ad[0].status).toEqual('available');
  });
});
