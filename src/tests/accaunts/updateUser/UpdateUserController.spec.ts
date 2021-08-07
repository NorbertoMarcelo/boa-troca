import { app } from '../../../app';
import request from 'supertest';
import { UsersRepository } from '@modules/accounts/repositories/UsersRepository';

describe('Update User Controller', () => {
  let repository: UsersRepository;

  beforeAll(async () => {
    repository = new UsersRepository();

    await request(app).post('/users/create').send({
      name: 'User Name',
      email: 'user5@email.com',
      password: 'password123',
      cpf: '89468576094',
      cep: '36032490',
    });
  });

  afterAll(async () => {
    const user = await repository.findByCpf('89468576094');

    if (user) await request(app).delete(`/users/delete/${user.id}`);
  });

  it('should be able to create a new user', async () => {
    const user = await repository.findByCpf('89468576094');

    const response = await request(app).put(`/users/update/${user.id}`).send({
      name: 'Outher User Name',
      email: 'outheruseremail@email.com',
      password: 'outherpassword123',
      cpf: '89468576094',
      cep: '05010000',
    });

    expect(response.status).toBe(201);
  });
});
