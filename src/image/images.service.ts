import { Injectable } from '@nestjs/common';
import { S3Service } from 'src/s3/s3.service';

import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService, private s3Service: S3Service) {}

  async create(file: Express.Multer.File) {
    const fileName = uuidv4();
    const ext = file.originalname.split('.')[0];
    const key = `${fileName}.${ext}`;
    const url = this.s3Service.getFileURLByKey(key);

    const isSuccess = await this.s3Service.upload(
      key,
      file.buffer,
      file.mimetype,
    );

    if (!isSuccess) throw new Error('IMAGE_UPLOAD_FAILED');

    const image = await this.prisma.image.create({ data: { key, url } });

    return image;
  }
}
