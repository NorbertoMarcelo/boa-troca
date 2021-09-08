import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { app } from '../../../app';

describe('Create User Controller', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterEach(async () => {
    await connection.query('TRUNCATE TABLE users;');
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
      phone: '32148000',
      cpf: '08246241060',
      cep: '36032490',
    });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a new user', async () => {
    await request(app).post('/users/create').send({
      name: 'User Name',
      email: 'user@email.com',
      password: 'password123',
      phone: '32148000',
      cpf: '57960384002',
      cep: '36032490',
    });

    const response = await request(app).post('/users/create').send({
      name: 'User Name',
      email: 'user@email.com',
      password: 'password123',
      phone: '32148000',
      cpf: '57960384002',
      cep: '36032490',
    });

    expect(response.status).toBe(400);
  });

  it('should not be able to create a new user if data is wrong', async () => {
    const response = await request(app).post('/users/create').send({
      name: 'User N4me',
      email: 'useremail.com',
      password: '123',
      phone: '32148000',
      cpf: '57960004002',
      cep: '36032490',
    });

    expect(response.status).toBe(400);
  });
});
