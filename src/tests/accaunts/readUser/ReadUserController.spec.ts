import { app } from '../../../app';
import request from 'supertest';
import { UsersRepository } from '@modules/accounts/repositories/UsersRepository';

describe('Read User Controller', () => {
  let repository: UsersRepository;

  beforeAll(async () => {
    repository = new UsersRepository();

    await request(app).post('/users/create').send({
      name: 'User Name',
      email: 'user4@email.com',
      password: 'password123',
      cpf: '96467077008',
      cep: '36032490',
    });
  });

  afterAll(async () => {
    const user = await repository.findByCpf('96467077008');

    if (user) await request(app).delete(`/users/delete/${user.id}`);
  });

  it('should be able to read an user', async (done) => {
    const user = await repository.findByCpf('96467077008');

    const response = await request(app).get(`/users/read/${user.id}`);

    expect(response.status).toBe(201);
  });

  it('should not be abele to read a nonexistent user', async () => {
    const response = await request(app).get(`/users/read/${'000000000'}`);

    expect(response.status).toBe(400);
  });
});
