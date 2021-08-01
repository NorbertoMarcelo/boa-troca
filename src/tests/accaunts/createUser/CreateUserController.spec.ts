import { app } from '../../../app';
import request from 'supertest';
import { Connection, createConnection } from 'typeorm';

describe('Create User Controller', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users/create').send({
      name: 'User Name',
      email: 'user@email.com',
      password: 'password123',
      cpf: '58753551079',
      cep: '36032490',
    });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a new user', async () => {
    await request(app).post('/users/create').send({
      name: 'User Name',
      email: 'user@email.com',
      password: 'password123',
      cpf: '58753551079',
      cep: '36032490',
    });

    const response = await request(app).post('/users/create').send({
      name: 'User Name',
      email: 'user@email.com',
      password: 'password123',
      cpf: '58753551079',
      cep: '36032490',
    });

    expect(response.status).toBe(400);
  });
});
