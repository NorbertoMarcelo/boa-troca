import { AppError } from '@errors/AppError';
import { CreateUserUseCase } from '@modules/accounts/useCases/CreateUserUseCase';
import { UpdateUserUseCase } from '@modules/accounts/useCases/UpdateUserUseCase';
import { UsersRepositoryInMemory } from '@tests/accaunts/UserRepositoryInMemory';

describe('Update User Use Case', () => {
  let createUserUseCase: CreateUserUseCase;
  let updateUserUseCase: UpdateUserUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    updateUserUseCase = new UpdateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to create a new user', async () => {
    const user = await createUserUseCase.execute({
      name: 'User Name',
      email: 'user@email.com',
      password: 'password123',
      cpf: '10197761020',
      cep: '36036080',
    });

    await updateUserUseCase.execute({
      id: user.id,
      name: 'Outher User Name',
      email: 'outheruseremail@email.com',
      password: 'outherpassword123',
      cep: '05010000',
    });

    expect(user.name).toEqual('Outher User Name');
    expect(user.email).toEqual('outheruseremail@email.com');
    expect(user.cep).toEqual('05010000');
  });
});
