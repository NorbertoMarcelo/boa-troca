import { app } from '../../../app';
import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { UsersRepository } from '@modules/accounts/repositories/UsersRepository';

describe('Authenticate Controller', () => {
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

  it('should be able to read an user', async () => {
    const user = await repository.findByCpf('58753551079');

    const response = await request(app).get(`/users/read/${user.id}`);

    expect(response.status).toBe(201);
  });

  it('should not be abele to read a nonexistent user', async () => {
    const user = await repository.findByCpf('58753551079');

    const response = await request(app).get(`/users/read/${'000000000'}`);

    expect(response.status).toBe(400);
  });
});
