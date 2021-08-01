import { AppError } from '@errors/AppError';
import { CreateUserUseCase } from '@modules/accounts/useCases/CreateUserUseCase';
import { AuthenticateUserUseCase } from '@modules/accounts/useCases/AuthenticateUserUseCase';
import { UsersRepositoryInMemory } from '@tests/accaunts/UserRepositoryInMemory';

describe('Authenticate User Use Case', () => {
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let createUserUseCase: CreateUserUseCase;
  let userRepositoryInMemory: UsersRepositoryInMemory;

  beforeEach(async () => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory
    );

    await createUserUseCase.execute({
      name: 'User Name',
      email: 'user@email.com',
      password: 'password123',
      cpf: '10197761020',
      cep: '36036080',
    });
  });

  it('should be able to authenticate an user', async () => {
    const login = await authenticateUserUseCase.execute({
      email: 'user@email.com',
      password: 'password123',
    });

    expect(login).toHaveProperty('token');
    expect(login).toHaveProperty('user');
    expect(login).not.toHaveProperty('password');
    expect(login.user.name).toBe('User Name');
    expect(login.user.email).toBe('user@email.com');
  });

  it('should not be able to authenticate an nonexistent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: 'password123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect password', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'user@email.com',
        password: 'incorrectpassword',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
