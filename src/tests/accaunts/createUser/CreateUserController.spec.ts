import { app } from '../../../app';
import request from 'supertest';
import { UsersRepository } from '@modules/accounts/repositories/UsersRepository';

describe('Create User Controller', () => {
  let repository: UsersRepository;

  beforeAll(async () => {
    repository = new UsersRepository();
  });

  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users/create').send({
      name: 'User Name',
      email: 'user05@email.com',
      password: 'password123',
      cpf: '08246241060',
      cep: '36032490',
    });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a new user', async () => {
    await request(app).post('/users/create').send({
      name: 'User Name',
      email: 'user06@email.com',
      password: 'password123',
      cpf: '57960384002',
      cep: '36032490',
    });

    const response = await request(app).post('/users/create').send({
      name: 'User Name',
      email: 'user06@email.com',
      password: 'password123',
      cpf: '57960384002',
      cep: '36032490',
    });

    expect(response.status).toBe(400);
  });
});
