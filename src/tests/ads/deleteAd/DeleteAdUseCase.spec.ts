import { AppError } from '@errors/AppError';
import { CreateAdUseCase } from '@modules/ads/useCases/CreateAdUseCase';
import { DeleteAdUseCase } from '@modules/ads/useCases/DeleteAdUseCase';
import { AdsRepositoryInMemory } from '../AdsRepositoryInMemory';

describe('Delete Ad Use Case', () => {
  let createAdUseCase: CreateAdUseCase;
  let deleteAdUseCase: DeleteAdUseCase;
  let adRepositoryInMemory: AdsRepositoryInMemory;

  beforeEach(() => {
    adRepositoryInMemory = new AdsRepositoryInMemory();
    createAdUseCase = new CreateAdUseCase(adRepositoryInMemory);
    deleteAdUseCase = new DeleteAdUseCase(adRepositoryInMemory);
  });

  it('shoud be able to delete an ad', async () => {
    await createAdUseCase.execute({
      title: 'Ad Title',
      description: 'The ad description.',
    });

    const deleteAd = await adRepositoryInMemory.findByTitle('Ad Title');

    await deleteAdUseCase.execute(deleteAd[0].id);

    const response = await adRepositoryInMemory.findById(deleteAd[0].id);

    expect(response).toBeUndefined();
  });

  it('shoud not be able to delete if ad not found', async () => {
    expect(async () => {
      await adRepositoryInMemory.findById(
        '71b2589d-f195-4981-989b-f9025fc9e9e5'
      );
    }).rejects.toBeInstanceOf(AppError);
  });
});
