import { app } from '../../../app';
import request from 'supertest';
import { UsersRepository } from '@modules/accounts/repositories/UsersRepository';

describe('Update User Controller', () => {
  let repository: UsersRepository;

  beforeAll(async () => {
    repository = new UsersRepository();
  });

  it('should be able to create a new user', async () => {
    await request(app).post('/users/create').send({
      name: 'User Name',
      email: 'user17@email.com',
      password: 'password123',
      cpf: '00795584024',
      cep: '36032490',
    });

    const user = await repository.findByCpf('00795584024');

    const response = await request(app).put(`/users/update/${user.id}`).send({
      name: 'Outher User Name',
      email: 'outheruseremail@email.com',
      password: 'outherpassword123',
      cpf: '03097341005',
      cep: '05010000',
    });

    expect(response.status).toBe(201);
  });
});
