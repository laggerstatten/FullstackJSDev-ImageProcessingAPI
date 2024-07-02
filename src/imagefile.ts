import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';


export default class Imagefile {

  static async getImagePath(filename: string, width?: number, height?: number): Promise<null | string> {

    const imagePath: string =
      width && height
        ? path.resolve(
          path.resolve(__dirname, '../assets/images/thumb'),
          `${filename}-${width}x${height}.jpg`
        )
        : path.resolve(
          path.resolve(__dirname, '../assets/images/full'), 
          `${filename}.jpg`);

    await fs.access(imagePath);
    return imagePath;
  }

  static async createThumbnail(filename: string, width: number, height: number): Promise<null | string> {
    if (!filename || !width || !height) {
      return null;
    }

    const filePathFull: string = path.resolve(__dirname, `../assets/images/full/${filename}.jpg`);
    const filePathThumb: string = path.resolve(__dirname, `../assets/images/thumb/${filename}-${width}x${height}.jpg`);

    try {
      await sharp(filePathFull)
        .resize(width, height)
        .toFormat('jpeg')
        .toFile(filePathThumb);
      return null;
    } catch {
      return 'Image not resized.';
    }
  }

}

