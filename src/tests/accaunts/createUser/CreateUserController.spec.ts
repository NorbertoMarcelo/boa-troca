import { app } from '../../../app';
import request from 'supertest';
import { UsersRepository } from '@modules/accounts/repositories/UsersRepository';

describe('Create User Controller', () => {
  let repository: UsersRepository;

  beforeAll(async () => {
    repository = new UsersRepository();
  });

  afterAll(async () => {
    const user = await repository.findByCpf('57960384002');

    if (user) await request(app).delete(`/users/delete/${user.id}`);
  });

  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users/create').send({
      name: 'User Name',
      email: 'user2@email.com',
      password: 'password123',
      cpf: '57960384002',
      cep: '36032490',
    });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a new user', async () => {
    await request(app).post('/users/create').send({
      name: 'User Name',
      email: 'user2@email.com',
      password: 'password123',
      cpf: '57960384002',
      cep: '36032490',
    });

    const response = await request(app).post('/users/create').send({
      name: 'User Name',
      email: 'user2@email.com',
      password: 'password123',
      cpf: '57960384002',
      cep: '36032490',
    });

    expect(response.status).toBe(400);
  });
});
