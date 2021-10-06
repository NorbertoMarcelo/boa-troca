import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { app } from '../../../app';

describe('Authenticate User Controller', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterEach(async () => {
    await connection.query('TRUNCATE users CASCADE;');
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to authenticate an user', async () => {
    await request(app).post('/users/create').send({
      name: 'User Name',
      email: 'user@email.com',
      password: 'password123',
      phone: '32148000',
      cpf: '58753551079',
      cep: '36032490',
    });

    const login = await request(app)
      .post('/sessions/login')
      .send({ email: 'user@email.com', password: 'password123' });

    console.log(login.body.user);

    expect(login.status).toBe(200);
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
    await request(app).post('/users/create').send({
      name: 'User Name',
      email: 'user@email.com',
      password: 'password123',
      cpf: '22597533026',
      cep: '36032490',
    });

    const login = await request(app)
      .post('/sessions/login')
      .send({ email: 'user@email.com', password: 'incorrectpassword' });

    expect(login.status).toBe(401);
  });
});
