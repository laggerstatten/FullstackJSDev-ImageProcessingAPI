import { promises as fs } from 'fs';
import path from 'path';
import Imagefile from './../imagefile';

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
        __dirname, `../assets/images/thumb/palmtunnel-100x100.jpg`
    );

    console.log(resizedImagePath);
    let errorFile: null | string = '';

    try {
      await fs.access(resizedImagePath);
      errorFile = null;
    } catch {
      errorFile = 'File not created';
    }

    expect(errorFile).toBeNull();
  });
});

// Erase test file
afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    __dirname, `../assets/images/thumb/palmtunnel-100x100.jpg`
  );

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {
  }
});
