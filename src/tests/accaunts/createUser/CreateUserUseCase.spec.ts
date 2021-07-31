import { CreateUserUseCase } from '@modules/accounts/useCases/CreateUserUseCase';
import { UsersRepositoryInMemory } from '../UserRepositoryInMemory';

describe('Create User Use Case', () => {
  let createUserUseCase: CreateUserUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to create a new user', async () => {
    const user = await createUserUseCase.execute({
      name: 'User Name',
      email: 'user@email.com',
      password: 'password123',
      cpf: '10197761020',
      cep: '36036080',
    });

    expect(user.name).toEqual('User Name');
    expect(user.email).toEqual('user@email.com');
    expect(user.email).toMatch(/\S+@\S+\.\S+/);
    expect(user.password).not.toEqual('password123');
    expect(user.cpf).toEqual('10197761020');
    expect(user.cep).toEqual('36036080');
  });

  it('should not be able to create a new user if the email is wrong or duplicated', async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: 'User Name 1',
        email: 'user@email.com',
        password: 'password123',
        cpf: '17058730067',
        cep: '36036080',
      });
      await createUserUseCase.execute({
        name: 'User Name 2',
        email: 'user@email.com',
        password: 'password123',
        cpf: '91898261083',
        cep: '36036080',
      });
    }).rejects.toBeInstanceOf(Error);

    expect(async () => {
      await createUserUseCase.execute({
        name: 'User Name',
        email: 'useremail.com',
        password: 'password123',
        cpf: '10197761020',
        cep: '36036080',
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to create a new user if the cpf is wrong or duplicated', async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: 'User Name 1',
        email: 'user1@email.com',
        password: 'password123',
        cpf: '34799347063',
        cep: '36036080',
      });
      await createUserUseCase.execute({
        name: 'User Name 2',
        email: 'user2@email.com',
        password: 'password123',
        cpf: '34799347063',
        cep: '36036080',
      });
    }).rejects.toBeInstanceOf(Error);

    expect(async () => {
      await createUserUseCase.execute({
        name: 'User Name 2',
        email: 'user2@email.com',
        password: 'password123',
        cpf: '11100011100',
        cep: '36036080',
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to create a new user if the cep is wrong', async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: 'User Name 1',
        email: 'user1@email.com',
        password: 'password123',
        cpf: '34799347063',
        cep: '00036080',
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to create a new user if the password is weak', async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: 'User Name 1',
        email: 'user1@email.com',
        password: 'pass',
        cpf: '34799347063',
        cep: '36036080',
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
