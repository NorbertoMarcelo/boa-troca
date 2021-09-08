import { CreateAdUseCase } from '@modules/ads/useCases/CreateAdUseCase';
import { AdsRepositoryInMemory } from '@tests/ads/AdsRepositoryInMemory';

describe('Create Announcement Use Case', () => {
  let createAdUseCase: CreateAdUseCase;
  let adRepositoryInMemory: AdsRepositoryInMemory;

  beforeEach(() => {
    adRepositoryInMemory = new AdsRepositoryInMemory();
    createAdUseCase = new CreateAdUseCase(adRepositoryInMemory);
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
