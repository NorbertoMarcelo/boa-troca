import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { app } from '../../../app';
import { UsersRepository } from '@modules/accounts/repositories/UsersRepository';

describe('Update User Controller', () => {
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

  it('should be able to update a user data', async () => {
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
      .put(`/users/update/${user.id}`)
      .send({
        name: 'Outher User Name',
        email: 'outheruseremail@email.com',
        password: 'outherpassword123',
        phone: '32148000',
        cpf: '00795584024',
        cep: '05010000',
      })
      .set('Authorization', 'Bearer ' + token);

    expect(response.status).toBe(200);
  });

  it('should not be able to update a user if data is invalid', async () => {
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
      .put(`/users/update/${user.id}`)
      .send({
        name: 'Outher Us3r Name',
        email: 'outheruseremailemail.com',
        password: 'd123',
        phone: '32148000',
        cpf: '00795584024',
        cep: '05010000',
      })
      .set('Authorization', 'Bearer ' + token);

    expect(response.status).toBe(400);
  });
});
