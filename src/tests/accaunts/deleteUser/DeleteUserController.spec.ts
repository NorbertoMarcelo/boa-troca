import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { app } from '../../../app';
import { UsersRepository } from '@modules/accounts/repositories/UsersRepository';

describe('Delete User Controller', () => {
  let connection: Connection;
  let repository: UsersRepository;

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    repository = new UsersRepository();

    await request(app).post('/users/create').send({
      name: 'User Name',
      email: 'user@email.com',
      password: 'password123',
      cpf: '58753551079',
      cep: '36032490',
    });
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should not be abele to delete a nonexistent user', async () => {
    const login = await request(app)
      .post('/sessions/login')
      .send({ email: 'user@email.com', password: 'password123' });

    const token = login.body.token;

    const response = await request(app)
      .delete(`/users/delete/${'000000000000'}`)
      .set('Authorization', 'Bearer ' + token);

    expect(response.status).toBe(400);
  });

  it('should be abele to delete an user', async () => {
    const login = await request(app)
      .post('/sessions/login')
      .send({ email: 'user@email.com', password: 'password123' });

    const token = login.body.token;

    const user = await repository.findByCpf('58753551079');

    const response = await request(app)
      .delete(`/users/delete/${user.id}`)
      .set('Authorization', 'Bearer ' + token);

    expect(response.status).toBe(204);
  });
});
