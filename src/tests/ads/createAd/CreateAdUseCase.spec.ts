import { CreateAdUseCase } from '@modules/ads/useCases/CreateAdUseCase';
import { CreateUserUseCase } from '@modules/accounts/useCases/CreateUserUseCase';
import { AdsRepositoryInMemory } from '@tests/ads/AdsRepositoryInMemory';
import { UsersRepositoryInMemory } from '@tests/accounts/UserRepositoryInMemory';

describe('Create Announcement Use Case', () => {
  let createAdUseCase: CreateAdUseCase;
  let createUserUseCase: CreateUserUseCase;
  let adRepositoryInMemory: AdsRepositoryInMemory;
  let usersRepositoryInMemory: UsersRepositoryInMemory;

  beforeEach(() => {
    adRepositoryInMemory = new AdsRepositoryInMemory();
    createAdUseCase = new CreateAdUseCase(adRepositoryInMemory);
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to crate a new ad', async () => {
    await createUserUseCase.execute({
      name: 'User Name',
      email: 'user@email.com',
      password: 'password123',
      phone: '32148000',
      cpf: '54923702001',
      cep: '36036080',
    });

    const user = await usersRepositoryInMemory.findByCpf('54923702001');

    // const response = await readUserUseCase.execute(user.id);

    await createAdUseCase.execute({
      title: 'Ad Title',
      description: 'The ad description.',
      user: user,
    });

    const ad = await adRepositoryInMemory.findByTitle('Ad Title');

    console.log(ad);

    expect(ad[0].title).toEqual('Ad Title');
    expect(ad[0].description).toEqual('The ad description.');
  });
});
