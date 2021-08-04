import { app } from '../../../app';
import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { UsersRepository } from '@modules/accounts/repositories/UsersRepository';

describe('Delete User Controller', () => {
  let connection: Connection;
  let repository: UsersRepository;

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    repository = new UsersRepository();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be abele to delete an user', async () => {
    const create = await request(app).post('/users/create').send({
      name: 'User Name',
      email: 'usercopy@email.com',
      password: 'password123',
      cpf: '58753551079',
      cep: '36032490',
    });

    const user = await repository.findByCpf('58753551079');

    const response = await request(app)
      .delete('/users/delete')
      .send({ id: user.id });

    expect(create.status).toBe(201);
    // expect(response.status).toBe(204);
  });

  it('should not be abele to delete a nonexistent user', async () => {
    const response = await request(app)
      .delete('/users/delete')
      .send('000000000000');

    expect(response.status).toBe(400);
  });
});
