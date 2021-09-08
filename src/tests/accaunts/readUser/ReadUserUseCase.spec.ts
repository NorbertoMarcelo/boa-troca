import { UsersRepositoryInMemory } from '@tests/accaunts/UserRepositoryInMemory';
import { CreateUserUseCase } from '@modules/accounts/useCases/CreateUserUseCase';
import { ReadUserUseCase } from '@modules/accounts/useCases/ReadUserUseCase';
import { AppError } from '@errors/AppError';

describe('Read User Use Case', () => {
  let createUserUseCase: CreateUserUseCase;
  let readUserUseCase: ReadUserUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;

  beforeEach(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    readUserUseCase = new ReadUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to read an user', async () => {
    await createUserUseCase.execute({
      name: 'User Name',
      email: 'user@email.com',
      password: 'password123',
      phone: '32148000',
      cpf: '54923702001',
      cep: '36036080',
    });

    const user = await usersRepositoryInMemory.findByCpf('54923702001');

    const response = await readUserUseCase.execute(user.id);

    expect(response.name).toEqual('User Name');
    expect(response.email).toEqual('user@email.com');
    expect(response.cep).toEqual('36036080');
    expect(response).not.toHaveProperty('password');
    expect(response).not.toHaveProperty('cpf');
  });

  it('should not be able to read an nonexistent user', async () => {
    await expect(
      readUserUseCase.execute('5b1c2509-66d8-4783-b13d-572abb1ac3e8')
    ).rejects.toBeInstanceOf(AppError);
  });
});
