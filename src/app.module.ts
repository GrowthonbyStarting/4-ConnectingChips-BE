import { GruopModule } from './project/gruop.module';
import { AdminModule } from './account/admin/admin.module';
import { ImagesModule } from './image/images.module';
import { S3Module } from './s3/s3.module';
import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './account/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    UserModule,
    AdminModule,
    GruopModule,
    S3Module,
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
