import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { app } from '../../../app';

describe('Create Announcement Use Case', () => {
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
    const response = await request(app).post('/ads/create').send({
      title: 'Ad Title',
      description: 'The ad description.',
    });

    expect(response.status).toBe(201);
  });
});
