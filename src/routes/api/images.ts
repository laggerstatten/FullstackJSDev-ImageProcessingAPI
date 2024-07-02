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
        res.send(error);
      }
    }

    const imagePath: null | string = await Imagefile.getImagePath(filename, width, height);
    
    if (imagePath) {
      res.sendFile(imagePath);
    }
  }
);

export default images;