import express from 'express';
import path from 'path';
import sharp from 'sharp';
import { promises as fs } from 'fs';
import Imagefile from './../../imagefile';

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

    if (!filename) {
      res.status(400).send('Filename is required');
      return;
    }

    if (width <= 0 || height <= 0) {
      res.status(400).send('Invalid width or height');
      return;
    }

    const filePath: string = path.resolve(
      path.resolve(__dirname, '../assets/images/thumb'),
      `${filename}-${width}x${height}.jpg`
    );

    let error: null | string = '';

    try {
      await fs.access(filePath);
    } catch {
      error = await Imagefile.createThumbnail(filename, width, height);
      if (error) {
        res.status(500).send(error);
        return;
      }
    }

    const imagePath: null | string = await Imagefile.getImagePath(filename, width, height);

    if (imagePath) {
      res.sendFile(imagePath);
    } else {
      res.status(500).send('Failed to retrieve image');
    }
  }
);

export default images;