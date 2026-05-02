import multer from 'multer';
import path from 'path';
import config from '../config.ts';
import fs from 'fs/promises';
import { randomUUID } from 'crypto';

const createStorage = (subDir: string) => {
  return multer.diskStorage({
    destination: async (_req, _file, cb) => {
      const destDir = path.join(config.publicPath, subDir);
      await fs.mkdir(destDir, { recursive: true });
      cb(null, destDir);
    },
    filename: (_req, file, cb) => {
      const extension = path.extname(file.originalname);
      cb(null, randomUUID() + extension);
    },
  });
};

export const avatarUpload = multer({
  storage: createStorage('uploads/users/avatar'),
});
export const establishmentUpload = multer({
  storage: createStorage('uploads/establishment'),
});
export const reviewImageUpload = multer({
  storage: createStorage('uploads/reviews/images'),
});
