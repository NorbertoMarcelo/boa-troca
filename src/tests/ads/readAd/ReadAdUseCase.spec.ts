import { CreateAdUseCase } from '@modules/ads/useCases/CreateAdUseCase';
import { ReadAdUseCase } from '@modules/ads/useCases/ReadAdUseCase';
import { AdsRepositoryInMemory } from '../AdsRepositoryInMemory';

describe('Read Ad Use Case', () => {
  let createAdUseCase: CreateAdUseCase;
  let readAdUseCase: ReadAdUseCase;
  let adRepositoryInMemory: AdsRepositoryInMemory;

  beforeEach(() => {
    adRepositoryInMemory = new AdsRepositoryInMemory();
    createAdUseCase = new CreateAdUseCase(adRepositoryInMemory);
    readAdUseCase = new ReadAdUseCase(adRepositoryInMemory);
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
  });
});
