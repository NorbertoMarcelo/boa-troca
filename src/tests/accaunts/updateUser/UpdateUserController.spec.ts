import { app } from '../../../app';
import request from 'supertest';
import { Connection, createConnection } from 'typeorm';

describe('Update User Controller', () => {
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
    const user = await request(app).post('/users/create').send({
      name: 'User Name',
      email: 'user@email.com',
      password: 'password123',
      cpf: '58753551079',
      cep: '36032490',
    });

    await request(app).put('/users/update').send({
      id: user.id,
      name: 'Outher User Name',
      email: 'outheruseremail@email.com',
      password: 'outherpassword123',
      cep: '05010000',
    });
  });
});
