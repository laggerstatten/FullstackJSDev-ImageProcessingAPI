import supertest from 'supertest';
import app from '../index';
import { promises as fs } from 'fs';
import path from 'path';

const request = supertest(app);

describe('Test responses from endpoints', (): void => {

  describe('endpoint: /', (): void => {

    it('gets /', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/');

      expect(response.status).toBe(200);
    });
  });

  describe('endpoint: /api/images', (): void => {

    it('gets /api/images?filename=santamonica', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=santamonica'
      );

      expect(response.status).toBe(200);
    });

    it('gets /api/images?filename=santamonica&width=100&height=100', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=santamonica&width=100&height=100'
      );

      expect(response.status).toBe(200);
    });

    it('gets /api/images?filename=santamonica&width=-100&height=100', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?filename=santamonica&width=-100&height=100'
      );

      expect(response.status).toBe(400);
    });

    it('gets /api/images', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/api/images');

      expect(response.status).toBe(400);
    });
  });

  describe('endpoint: /invalid', (): void => {

    it('returns 404 for invalid endpoint', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/invalid');

      expect(response.status).toBe(404);
    });
  });
});

// Erase test file
afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    __dirname, `../../assets/images/thumb/santamonica-100x100.jpg`
  );


  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch (err) {
    console.error(err);
  }
});
