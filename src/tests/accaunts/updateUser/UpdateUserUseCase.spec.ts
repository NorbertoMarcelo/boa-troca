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

  it('should be able to update user data', async () => {
    await createUserUseCase.execute({
      name: 'User Name',
      email: 'user@email.com',
      password: 'password123',
      phone: '32148000',
      cpf: '10197761020',
      cep: '36036080',
    });

    const user = await usersRepositoryInMemory.findByCpf('10197761020');

    await updateUserUseCase.execute({
      id: user.id,
      name: 'Outher User Name',
      email: 'outheruseremail@email.com',
      password: 'outherpassword123',
      phone: '32148000',
      cep: '05010000',
    });

    expect(user.name).toEqual('Outher User Name');
    expect(user.email).toEqual('outheruseremail@email.com');
    expect(user.cep).toEqual('05010000');
  });

  it('should not be able to update user if data is invalid', async () => {
    await createUserUseCase.execute({
      name: 'User Name',
      email: 'user@email.com',
      password: 'password123',
      phone: '32148000',
      cpf: '10197761020',
      cep: '36036080',
    });

    const user = await usersRepositoryInMemory.findByCpf('10197761020');

    expect(async () => {
      await updateUserUseCase.execute({
        id: user.id,
        name: 'Outher User N4me',
        email: 'outheruseremailemail.com',
        password: '123',
        phone: '321480#00',
        cep: '05010000',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update data user not found', async () => {
    await createUserUseCase.execute({
      name: 'User Name',
      email: 'user@email.com',
      password: 'password123',
      phone: '32148000',
      cpf: '10197761020',
      cep: '36036080',
    });

    expect(async () => {
      await updateUserUseCase.execute({
        id: '5b1c2509-66d8-4783-b13d-572abb1ac3e8',
        name: 'Outher User Name',
        email: 'outheruseremail@email.com',
        password: 'outherpassword123',
        phone: '32148000',
        cep: '05010000',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
