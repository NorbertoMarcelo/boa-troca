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
      email: 'user17@email.com',
      password: 'password123',
      cpf: '54923702001',
      cep: '36036080',
    });

    const newUser = await usersRepositoryInMemory.findByCpf('54923702001');

    const user = await readUserUseCase.execute(newUser.id);

    expect(user.name).toEqual('User Name');
    expect(user.email).toEqual('user17@email.com');
    expect(user).not.toHaveProperty('password');
    expect(user).not.toHaveProperty('cpf');
  });

  it('should not be able to read an nonexistent user', async () => {
    await expect(
      readUserUseCase.execute('00000000000000000000')
    ).rejects.toBeInstanceOf(AppError);
  });
});
