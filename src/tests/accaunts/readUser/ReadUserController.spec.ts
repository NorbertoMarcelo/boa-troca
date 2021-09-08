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
  });

  afterEach(async () => {
    await connection.query('TRUNCATE TABLE users;');
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to read an user', async () => {
    await request(app).post('/users/create').send({
      name: 'User Name',
      email: 'user@email.com',
      password: 'password123',
      phone: '32148000',
      cpf: '65564241029',
      cep: '36032490',
    });

    const login = await request(app)
      .post('/sessions/login')
      .send({ email: 'user@email.com', password: 'password123' });

    const token = login.body.token;

    const user = await repository.findByCpf('65564241029');

    const response = await request(app)
      .get(`/users/read/${user.id}`)
      .set('Authorization', 'Bearer ' + token);

    expect(response.status).toBe(200);
    expect(response.body.name).toEqual('User Name');
    expect(response.body.email).toEqual('user@email.com');
    expect(response.body.cep).toEqual('36032490');
  });

  it('should not be abele to read a nonexistent user', async () => {
    await request(app).post('/users/create').send({
      name: 'User Name',
      email: 'user@email.com',
      password: 'password123',
      phone: '32148000',
      cpf: '65564241029',
      cep: '36032490',
    });

    const login = await request(app)
      .post('/sessions/login')
      .send({ email: 'user@email.com', password: 'password123' });

    const token = login.body.token;

    const response = await request(app)
      .get(`/users/read/5b1c2509-66d8-4783-b13d-572abb1ac3e8`)
      .set('Authorization', 'Bearer ' + token);

    expect(response.status).toBe(400);
  });
});
