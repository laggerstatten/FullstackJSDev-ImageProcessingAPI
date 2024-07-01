import express from 'express';
import path from 'path';
import sharp from 'sharp';
import { promises as fs } from 'fs';

const imagesFullPath = path.resolve(__dirname, '../assets/images/full');
const imagesThumbPath = path.resolve(__dirname, '../assets/images/thumb');

const images: express.Router = express.Router();

images.get(
  '/',
  async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    const filename = req.query.filename as string;
    const width = parseInt(req.query.width as string, 10);
    const height = parseInt(req.query.height as string, 10);

    try {
      if (!filename || typeof filename !== 'string') {
        throw new Error('Invalid filename');
      }

      if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
        throw new Error('Invalid width or height');
      }

      const filePathThumb: string =
        path.resolve(
          imagesThumbPath,
          `${req.query.filename}-${width}x${height}.jpg`
        );

      const filePathFull: string =
        path.resolve(
          imagesFullPath,
          `${req.query.filename}.jpg`
        );

      const filePath: string =
        width && height
          ? path.resolve(
            imagesThumbPath,
            `${req.query.filename}-${width}x${height}.jpg`
          )
          : path.resolve(imagesFullPath, `${req.query.filename}.jpg`);

      try {
        await fs.access(filePathThumb);
      } catch {
        try {
          await sharp(filePathFull)
            .resize(width, height)
            .toFormat('jpeg')
            .toFile(filePathThumb);
        } catch {
          res.send('Resizing failed.');
        }
      }

      await fs.access(filePath);

      if (filePath) {
        res.sendFile(filePath);
      } else {
        res.send('Image not found');
      }
    } catch (error) {
      console.error('Error processing image request:', error);
      res.status(500).send('Internal server error');
    }
  }
);

export default images;