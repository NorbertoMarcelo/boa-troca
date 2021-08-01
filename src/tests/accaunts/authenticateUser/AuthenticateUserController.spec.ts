import { app } from '../../../app';
import request from 'supertest';
import { Connection, createConnection } from 'typeorm';

describe('Authenticate User Controller', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

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

  it('should be able to authenticate an user', async () => {
    const login = await request(app)
      .post('/sessions/login')
      .send({ email: 'user@email.com', password: 'password123' });

    expect(login.body).toHaveProperty('token');
    expect(login.body).toHaveProperty('user');
    expect(login).not.toHaveProperty('password');
  });

  it('should not be able to authenticate an nonexistent user', async () => {
    const login = await request(app)
      .post('/sessions/login')
      .send({ email: 'false@email.com', password: 'password123' });

    expect(login.status).toBe(401);
  });

  it('should not be able to authenticate with incorrect password', async () => {
    const login = await request(app)
      .post('/sessions/login')
      .send({ email: 'user@email.com', password: 'incorrectpassword' });

    expect(login.status).toBe(401);
  });
});
