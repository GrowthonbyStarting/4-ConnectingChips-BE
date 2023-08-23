import { ReadStream } from 'fs';
import {
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
const {
  S3_AWSACCESS_KEY_ID,
  S3_AWS_SECRET_ACCESS_KEY,
  CLOUD_FRONT_URL,
  S3_REGION,
  S3_BUCKET_NAME,
} = process.env;

@Injectable()
export class S3Service {
  public region = S3_REGION;

  public bucket = S3_BUCKET_NAME;

  private client = new S3Client({
    region: S3_REGION,
    credentials: {
      accessKeyId: S3_AWSACCESS_KEY_ID,
      secretAccessKey: S3_AWS_SECRET_ACCESS_KEY,
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
    return `${CLOUD_FRONT_URL}/${key}`;
  }
}
