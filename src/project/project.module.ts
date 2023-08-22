import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ImagesService } from 'src/image/images.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, ImagesService],
})
export class ProjectModule {}
