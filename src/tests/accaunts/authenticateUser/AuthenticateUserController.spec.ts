import { app } from '../../../app';
import request from 'supertest';
import { UsersRepository } from '@modules/accounts/repositories/UsersRepository';

describe('Authenticate User Controller', () => {
  let repository: UsersRepository;

  beforeAll(async () => {
    repository = new UsersRepository();
  });

  it('should be able to authenticate an user', async () => {
    await request(app).post('/users/create').send({
      name: 'User Name',
      email: 'user01@email.com',
      password: 'password123',
      cpf: '58753551079',
      cep: '36032490',
    });

    const login = await request(app)
      .post('/sessions/login')
      .send({ email: 'user01@email.com', password: 'password123' });

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
      email: 'user02@email.com',
      password: 'password123',
      cpf: '22597533026',
      cep: '36032490',
    });

    const login = await request(app)
      .post('/sessions/login')
      .send({ email: 'user02@email.com', password: 'incorrectpassword' });

    expect(login.status).toBe(401);
  });
});
