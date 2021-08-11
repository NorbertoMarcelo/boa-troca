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

    await request(app).post('/users/create').send({
      name: 'User Name',
      email: 'user@email.com',
      password: 'password123',
      cpf: '00795584024',
      cep: '36032490',
    });
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new user', async () => {
    const login = await request(app)
      .post('/sessions/login')
      .send({ email: 'user@email.com', password: 'password123' });

    const token = login.body.token;

    const user = await repository.findByCpf('00795584024');

    const response = await request(app)
      .put(`/users/update/${user.id}`)
      .send({
        name: 'Outher User Name',
        email: 'outheruseremail@email.com',
        password: 'outherpassword123',
        cpf: '00795584024',
        cep: '05010000',
      })
      .set('Authorization', 'Bearer ' + token);

    expect(response.status).toBe(201);
  });
});
