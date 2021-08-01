import { app } from '../../../app';
import request from 'supertest';
import { Connection, createConnection } from 'typeorm';

describe('Delete User Controller', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const user = await request(app).post('/users/create').send({
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
    const response = await request(app)
      .delete('/users/delete')
      .send('000000000000');

    expect(response.status).toBe(400);
  });

  it('should be abele to delete an user', async () => {
    const response = await request(app).delete('/users/delete').send(user.id);

    expect(response.status).toBe(200);
  });
});
