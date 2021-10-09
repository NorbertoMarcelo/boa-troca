import { CreateUserUseCase } from '@modules/accounts/useCases/CreateUserUseCase';
import { UsersRepositoryInMemory } from '@tests/accounts/UserRepositoryInMemory';
import { AppError } from '@errors/AppError';

describe('Create User Use Case', () => {
  let createUserUseCase: CreateUserUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to create a new user', async () => {
    await createUserUseCase.execute({
      name: 'User Name',
      email: 'user@email.com',
      password: 'password123',
      phone: '32148000',
      cpf: '48113558063',
      cep: '36036080',
    });

    const user = await usersRepositoryInMemory.findByCpf('48113558063');

    expect(user.name).toEqual('User Name');
    expect(user.email).toEqual('user@email.com');
    expect(user.email).toMatch(/\S+@\S+\.\S+/);
    expect(user.password).not.toEqual('password123');
    expect(user.cpf).toEqual('48113558063');
    expect(user.cep).toEqual('36036080');
  });

  it('should not be able to create a new user if the email is wrong or duplicated', async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: 'User Name 1',
        email: 'user@email.com',
        password: 'password123',
        phone: '32148000',
        cpf: '03741481041',
        cep: '36036080',
      });
      await createUserUseCase.execute({
        name: 'User Name 2',
        email: 'user@email.com',
        password: 'password123',
        phone: '32148000',
        cpf: '91898261083',
        cep: '36036080',
      });
    }).rejects.toBeInstanceOf(AppError);

    expect(async () => {
      await createUserUseCase.execute({
        name: 'User Name',
        email: 'useremail.com',
        password: 'password123',
        phone: '32148000',
        cpf: '10197761020',
        cep: '36036080',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user if the cpf is wrong or duplicated', async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: 'User Name 1',
        email: 'user@email.com',
        password: 'password123',
        phone: '32148000',
        cpf: '34799347063',
        cep: '36036080',
      });
      await createUserUseCase.execute({
        name: 'User Name 2',
        email: 'user@email.com',
        password: 'password123',
        phone: '32148000',
        cpf: '34799347063',
        cep: '36036080',
      });
    }).rejects.toBeInstanceOf(AppError);

    expect(async () => {
      await createUserUseCase.execute({
        name: 'User Name',
        email: 'user@email.com',
        password: 'password123',
        phone: '32148000',
        cpf: '11100011100',
        cep: '36036080',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user if the cep is wrong', async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: 'User Name 1',
        email: 'user@email.com',
        password: 'password123',
        phone: '32148000',
        cpf: '04900380008',
        cep: '00036080',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user if the password is weak', async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: 'User Name 1',
        email: 'user@email.com',
        password: 'pass',
        phone: '32148000',
        cpf: '26564404085',
        cep: '36036080',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to crate a new user if the phone number is invalid', async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: 'User Name 1',
        email: 'user@email.com',
        password: 'password123',
        phone: '321480A00',
        cpf: '04900380008',
        cep: '36036080',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
