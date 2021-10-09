import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { app } from '../../../app';

describe('Create Announcement Controller', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to crate a new ad', async () => {
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

    console.log(login.body);

    const token = login.body.token;

    const response = await request(app)
      .post('/ads/create')
      .send({
        title: 'Ad Title',
        description: 'The ad description.',
      })
      .set('Authorization', 'Bearer ' + token);

    expect(response.status).toBe(201);
  });
});
