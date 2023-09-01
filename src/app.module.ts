import { InjectAccountMiddleware } from './middlewares/injectAccount.middleware';
import { RolesGuard } from './guard/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { AppService } from './app.service';
import { GruopModule } from './group/gruop.module';
import { AdminModule } from './account/admin/admin.module';
import { ImagesModule } from './image/images.module';
import { S3Module } from './s3/s3.module';
import { PrismaModule } from './../prisma/prisma.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './account/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { ReplyModule } from './reply/reply.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UserModule,
    AdminModule,
    GruopModule,
    S3Module,
    ImagesModule,
    PostModule,
    CommentModule,
    ReplyModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(InjectAccountMiddleware).forRoutes('*');
  }
}
