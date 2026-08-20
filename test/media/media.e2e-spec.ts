// import request from 'supertest';
// import { AppModule } from '../../src/app.module';
// import { TestSetup } from '../utils/test-setup';

// describe('Media (e2e)', () => {
//   let testSetup: TestSetup;
//   let authToken: string;
//   let mediaId: string;

//   const testUser = {
//     email: 'tes2@example.com',
//     password: 'Password123!',
//     name: 'Test User',
//   };

//   beforeEach(async () => {
//     testSetup = await TestSetup.create(AppModule);

//     await request(testSetup.app.getHttpServer())
//       .post('/auth/register')
//       .send(testUser)
//       .expect(201);

//     const loginResponse = await request(testSetup.app.getHttpServer())
//       .post('/auth/login')
//       .send(testUser)
//       .expect(201);

//     authToken = loginResponse.body.accessToken;

//     const response = await request(testSetup.app.getHttpServer())
//       .post('/media/create')
//       .set('Authorization', `Bearer ${authToken}`)
//       .send({
//         userId: loginResponse.accessToken,
//         title: 'Test Media',
//         comment: 'This is a test media item.',
//         url: 'http://example.com/media/test-media',
//       });
//     mediaId = response.body.id;
//   });

//   afterEach(async () => {
//     await testSetup.cleanup();
//   });

//   afterAll(async () => {
//     await testSetup.teardown();
//   });

//   it('/media (GET)', async () => {
//     const response = await request(testSetup.app.getHttpServer())
//       .get('/media')
//       .set('Authorization', `Bearer ${authToken}`)
//       .expect(200);

//     expect(Array.isArray(response.body)).toBe(true);
//     expect(response.body.length).toBeGreaterThan(0);
//   });
// });
