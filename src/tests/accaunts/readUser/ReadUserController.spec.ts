import { app } from '../../../app';
import request from 'supertest';
import { Connection, createConnection } from 'typeorm';

describe('Authenticate Controller', () => {
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

  it('should be able to read an user', async () => {
    const response = await request(app).get('/users/read').send(user.id);

    expect(response.status).toBe(200);
  });

  it('should not be abele to read a nonexistent user', async () => {
    const response = await request(app)
      .get('/users/read')
      .send('0000000000000000');

    expect(response.status).toBe(400);
  });
});
