import { AnnouncementsRepository } from '@modules/announcement/repositories/AnnouncementsRepository';
import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { app } from '../../../app';

describe('Update Announcement Controller', () => {
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

    const response = await request(app).put(`/ads/update/${ad[0].id}`).send({
      title: 'Outher Ad Title',
      description: 'Outher ad description.',
    });

    const read = await request(app).get(`/ads/read/${ad[0].id}`);

    expect(response.status).toBe(201);
    expect(read.body.title).toEqual('Outher Ad Title');
    expect(read.body.description).toEqual('Outher ad description.');
    expect(read.body.status).toEqual('available');
  });
});
