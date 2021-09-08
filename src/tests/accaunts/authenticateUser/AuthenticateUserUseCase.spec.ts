import { CreateUserUseCase } from '@modules/accounts/useCases/CreateUserUseCase';
import { AuthenticateUserUseCase } from '@modules/accounts/useCases/AuthenticateUserUseCase';
import { UsersRepositoryInMemory } from '@tests/accaunts/UserRepositoryInMemory';
import { AppError } from '@errors/AppError';

describe('Authenticate User Use Case', () => {
  let createUserUseCase: CreateUserUseCase;
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let userRepositoryInMemory: UsersRepositoryInMemory;

  beforeEach(async () => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory
    );
  });

  it('should be able to authenticate an user', async () => {
    await createUserUseCase.execute({
      name: 'User Name',
      email: 'user@email.com',
      password: 'password123',
      phone: '32148000',
      cpf: '86940657037',
      cep: '36036080',
    });

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
    await createUserUseCase.execute({
      name: 'User Name',
      email: 'user@email.com',
      password: 'password123',
      phone: '32148000',
      cpf: '86940657037',
      cep: '36036080',
    });

    await expect(
      authenticateUserUseCase.execute({
        email: 'user@email.com',
        password: 'incorrectpassword',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
