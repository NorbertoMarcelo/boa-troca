import { CreateUserUseCase } from '@modules/accounts/useCases/CreateUserUseCase';
import { DeleteUserUseCase } from '@modules/accounts/useCases/DeleteUserUseCase';
import { UsersRepositoryInMemory } from '../UserRepositoryInMemory';
import { AppError } from '@errors/AppError';

describe('Delete User Use Case', () => {
  let createUserUseCase: CreateUserUseCase;
  let deleteUserUseCase: DeleteUserUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;

  beforeEach(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    deleteUserUseCase = new DeleteUserUseCase(usersRepositoryInMemory);

    const user = await createUserUseCase.execute({
      name: 'User Name',
      email: 'user@email.com',
      password: 'password123',
      cpf: '10197761020',
      cep: '36036080',
    });
  });

  it('should be able to delete an user', async () => {
    const response = await deleteUserUseCase.execute(user.id);

    expect(response).toBe('user deleted successfully');
  });

  it('should not be able to delete an nonexistent user', async () => {
    await expect(
      deleteUserUseCase.execute('00000000000000000000')
    ).rejects.toBeInstanceOf(AppError);
  });
});
