import { AppError } from '@errors/AppError';
import { CreateAdUseCase } from '@modules/ads/useCases/CreateAdUseCase';
import { DeleteAdUseCase } from '@modules/ads/useCases/DeleteAdUseCase';
import { AdsRepositoryInMemory } from '../AdsRepositoryInMemory';
import { UsersRepositoryInMemory } from '@tests/accounts/UserRepositoryInMemory';

describe('Delete Ad Use Case', () => {
  let createAdUseCase: CreateAdUseCase;
  let deleteAdUseCase: DeleteAdUseCase;
  let adRepositoryInMemory: AdsRepositoryInMemory;
  let usersRepositoryInMemory: UsersRepositoryInMemory;

  beforeEach(() => {
    adRepositoryInMemory = new AdsRepositoryInMemory();
    createAdUseCase = new CreateAdUseCase(
      adRepositoryInMemory,
      usersRepositoryInMemory
    );
    deleteAdUseCase = new DeleteAdUseCase(adRepositoryInMemory);
  });

  it('shoud be able to delete an ad', async () => {
    await createAdUseCase.execute('Ad Title', 'The ad description.', 'user');

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
