import { S3_BUCKET_NAME } from './../config/s3.config';
import { ReadStream } from 'fs';
import {
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class S3Service {
  public region = process.env.S3_REGION;
  public bucket = S3_BUCKET_NAME;
  private client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_AWSACCESS_KEY_ID,
      secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY,
    },
  });

  async upload(
    key: string,
    file: Buffer | ReadStream,
    contentType: string,
  ): Promise<boolean> {
    const input: PutObjectCommandInput = {
      Key: key,
      Bucket: this.bucket,
      Body: file,
      ContentType: contentType,
    };
    const command = new PutObjectCommand(input);

    const result: PutObjectCommandOutput = await this.client.send(command);
    return result.$metadata.httpStatusCode === 200;
  }

  public getFileURLByKey(key: string): string {
    return `${process.env.CLOUD_FRONT_URL}/${key}`;
  }
}
