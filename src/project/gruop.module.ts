import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { ImagesService } from 'src/image/images.service';

@Module({
  controllers: [GroupController],
  providers: [GroupService, ImagesService],
})
export class GruopModule {}
