import { app } from '../../../app';
import request from 'supertest';
import { UsersRepository } from '@modules/accounts/repositories/UsersRepository';

describe('Read User Controller', () => {
  let repository: UsersRepository;

  beforeAll(async () => {
    repository = new UsersRepository();
  });

  it('should be able to read an user', async () => {
    await request(app).post('/users/create').send({
      name: 'User Name',
      email: 'user16@email.com',
      password: 'password123',
      cpf: '65564241029',
      cep: '36032490',
    });

    const user = await repository.findByCpf('65564241029');

    const response = await request(app).get(`/users/read/${user.id}`);

    expect(response.status).toBe(201);
  });

  it('should not be abele to read a nonexistent user', async () => {
    const response = await request(app).get(`/users/read/${'000000000'}`);

    expect(response.status).toBe(400);
  });
});
