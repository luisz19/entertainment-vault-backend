import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { TestSetup } from '../utils/test-setup';

describe('Media (e2e)', () => {
  let testSetup: TestSetup;
  let authToken: string;
  let categoryId: string;
  let mediaId: string;

  const testUser = {
    email: 'tes2@example.com',
    password: 'Password123!',
    name: 'Test User',
  };

  const testMedia = {
    title: 'Test Medie',
    comment: 'This is a test media item.',
    progress: 50,
    availableIn: 'Netflix',
    genre: 'Action',
    status: 'PENDING',
  };

  beforeEach(async () => {
    testSetup = await TestSetup.create(AppModule);

    await request(testSetup.app.getHttpServer())
      .post('/auth/register')
      .send(testUser)
      .expect(201);

    const loginResponse = await request(testSetup.app.getHttpServer())
      .post('/auth/login')
      .send(testUser)
      .expect(201);

    const categoryResponse = await request(testSetup.app.getHttpServer())
      .post('/categories')
      .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
      .send({
        name: 'Test Category',
        icon: 'test-icon',
      })
      .expect(201);

    authToken = loginResponse.body.accessToken;
    categoryId = categoryResponse.body.id;

    const response = await request(testSetup.app.getHttpServer())
      .post('/media')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        ...testMedia,
        categoryId: categoryId,
      })
      .expect(201);
    mediaId = response.body.id;

    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(testMedia.title);
    expect(response.body.categoryId).toBe(categoryId);
    expect(response.body.comment).toBe(testMedia.comment);
  });

  afterEach(async () => {
    await testSetup.cleanup();
    await testSetup.teardown();
  });

  it('/media (GET)', async () => {
    const response = await request(testSetup.app.getHttpServer())
      .get('/media')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('/media/category/:categoryId (GET)', async () => {
    const response = await request(testSetup.app.getHttpServer())
      .get(`/media/category/${categoryId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('categoryId', categoryId);
  });

  it('/media/category/:categoryId (GET) - No media found', async () => {
    const response = await request(testSetup.app.getHttpServer())
      .get('/media/category/d54313aa-0668-4288-b070-2634b7cf8d0a')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(404);

    expect(response.body).toHaveProperty(
      'message',
      'No media found for the specified category.',
    );
  });

  it('/media/:id (GET)', async () => {
    const response = await request(testSetup.app.getHttpServer())
      .get(`/media/${mediaId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', mediaId);
  });

  it('/media (POST) duplicate', async () => {
    return await request(testSetup.app.getHttpServer())
      .post('/media')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        ...testMedia,
        categoryId: categoryId,
      })
      .expect(409);
  });

  it('/media/:id (PATCH)', async () => {
    const updatedTitle = 'Updated Test Media';
    const response = await request(testSetup.app.getHttpServer())
      .patch(`/media/${mediaId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: updatedTitle,
        comment: 'Updated comment',
        progress: 75,
        availableIn: 'HBO Max',
        genre: 'Drama',
        status: 'IN_PROGRESS',
        completedAt: new Date().toISOString(),
        initiatedAt: new Date().toISOString(),
      })
      .expect(200);

    expect(response.body).toHaveProperty('id', mediaId);
    expect(response.body.title).toBe(updatedTitle);
    expect(response.body.comment).toBe('Updated comment');
    expect(response.body.status).toBe('IN_PROGRESS');
  });

  it('/media/:id (DELETE)', async () => {
    await request(testSetup.app.getHttpServer())
      .delete(`/media/${mediaId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(204);
  });
});
