import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { app } from '../../../app';
import { UsersRepository } from '@modules/accounts/repositories/UsersRepository';

describe('Read User Controller', () => {
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
      cpf: '65564241029',
      cep: '36032490',
    });
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to read an user', async () => {
    const login = await request(app)
      .post('/sessions/login')
      .send({ email: 'user@email.com', password: 'password123' });

    const token = login.body.token;

    const user = await repository.findByCpf('65564241029');

    const response = await request(app)
      .get(`/users/read/${user.id}`)
      .set('Authorization', 'Bearer ' + token);

    expect(response.status).toBe(201);
    expect(response.body.name).toEqual('User Name');
    expect(response.body.email).toEqual('user@email.com');
    expect(response.body.cep).toEqual('36032490');
  });

  it('should not be abele to read a nonexistent user', async () => {
    const login = await request(app)
      .post('/sessions/login')
      .send({ email: 'user@email.com', password: 'password123' });

    const token = login.body.token;

    const response = await request(app)
      .get(`/users/read/${'000000000'}`)
      .set('Authorization', 'Bearer ' + token);

    expect(response.status).toBe(400);
  });
});
