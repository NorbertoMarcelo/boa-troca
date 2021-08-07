import request from 'supertest';
import { app } from '../../../app';
import { UsersRepository } from '@modules/accounts/repositories/UsersRepository';

describe('Delete User Controller', () => {
  let repository: UsersRepository;

  beforeAll(async () => {
    repository = new UsersRepository();
  });

  it('should not be abele to delete a nonexistent user', async () => {
    const response = await request(app).delete(
      `/users/delete/${'000000000000'}`
    );

    expect(response.status).toBe(400);
  });

  it('should be abele to delete an user', async () => {
    await request(app).post('/users/create').send({
      name: 'User Name',
      email: 'user14@email.com',
      password: 'password123',
      cpf: '93062127040',
      cep: '36032490',
    });

    const user = await repository.findByCpf('93062127040');

    const response = await request(app).delete(`/users/delete/${user.id}`);

    expect(response.status).toBe(204);
  });
});
