import { S3Service } from 'src/s3/s3.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {}
