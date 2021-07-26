import express, { Request } from 'express';
import { FileFilterCallback } from 'multer';
import { extname } from 'path';

import { v4 as uuidv4 } from 'uuid';

export const imageFileFilter = (
  req: express.Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'));
  }
  callback(null, true);
};

export const editFileName = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void,
): void => {
  const fileExtName = extname(file.originalname);
  const randomName = uuidv4();
  callback(null, `${randomName}${fileExtName}`);
};
