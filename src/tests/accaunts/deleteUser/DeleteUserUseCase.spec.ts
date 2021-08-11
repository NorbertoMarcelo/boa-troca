import { CreateUserUseCase } from '@modules/accounts/useCases/CreateUserUseCase';
import { DeleteUserUseCase } from '@modules/accounts/useCases/DeleteUserUseCase';
import { UsersRepositoryInMemory } from '@tests/accaunts/UserRepositoryInMemory';
import { AppError } from '@errors/AppError';
import { ReadUserUseCase } from '@modules/accounts/useCases/ReadUserUseCase';

describe('Delete User Use Case', () => {
  let createUserUseCase: CreateUserUseCase;
  let deleteUserUseCase: DeleteUserUseCase;
  let readUserUseCase: ReadUserUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;

  beforeEach(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    deleteUserUseCase = new DeleteUserUseCase(usersRepositoryInMemory);
    readUserUseCase = new ReadUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to delete an user', async () => {
    await createUserUseCase.execute({
      name: 'User Name',
      email: 'user@email.com',
      password: 'password123',
      cpf: '94491128006',
      cep: '36036080',
    });

    const user = await usersRepositoryInMemory.findByCpf('94491128006');

    await deleteUserUseCase.execute(user.id);

    await expect(readUserUseCase.execute(user.id)).rejects.toBeInstanceOf(
      AppError
    );
  });

  it('should not be able to delete an nonexistent user', async () => {
    await expect(
      deleteUserUseCase.execute('00000000000000000000')
    ).rejects.toBeInstanceOf(AppError);
  });
});
