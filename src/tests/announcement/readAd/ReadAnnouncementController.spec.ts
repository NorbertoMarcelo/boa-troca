import { AnnouncementsRepository } from '@modules/announcement/repositories/AnnouncementsRepository';
import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { app } from '../../../app';

describe('Read Announcement Controller', () => {
  let connection: Connection;
  let adRepository: AnnouncementsRepository;

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    adRepository = new AnnouncementsRepository();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to crate a new ad', async () => {
    await request(app).post('/ads/create').send({
      title: 'Ad Title',
      description: 'The ad description.',
    });

    const ad = await adRepository.findByTitle('Ad Title');

    const response = await request(app).get(`/ads/read/${ad[0].id}`);

    console.log(response.body);

    expect(response.status).toBe(201);
    expect(response.body.title).toEqual('Ad Title');
    expect(response.body.description).toEqual('The ad description.');
    expect(response.body.status).toEqual('available');
  });
});
