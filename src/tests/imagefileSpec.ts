import supertest from 'supertest';
import app from '../index';
import { promises as fs } from 'fs';
import path from 'path';
import Imagefile from './../imagefile';

const request = supertest(app);

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('Test image processing', (): void => {

  describe('Test image processing via sharp', (): void => {
    it('raises an error due to invalid width', async (): Promise<void> => {
      const error: null | string = await Imagefile.createThumbnail('palmtunnel', -100, 100);
      expect(error).not.toBeNull();
    });

    it('raises an error due to invalid filename', async (): Promise<void> => {
      const error: null | string = await Imagefile.createThumbnail('palmtunel', 100, 100);
      expect(error).not.toBeNull();
    });

    it('creates resized thumb file', async (): Promise<void> => {
      await Imagefile.createThumbnail('palmtunnel', 100, 100);

      const resizedImagePath: string = path.resolve(
        path.resolve(__dirname, '../../assets/images/thumb'),
        'palmtunnel-100x100.jpg'
      );

      let error: null | string = null;

      try {
        console.log(resizedImagePath);
        await fs.access(resizedImagePath);
      } catch {
        error = 'File not created';

      }

      expect(error).toBeNull();
    });
  });
});

// Erase test file
afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    __dirname, `../../assets/images/thumb/palmtunnel-100x100.jpg`
  );


  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch (err) {
    console.error(err);
  }
});
