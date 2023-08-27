import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateProjectDto } from './dto/create-group.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLE } from 'src/constant/account.constant';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('/regist')
  @Roles(ROLE.ADMIN)
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body()
    createProjectDto: CreateProjectDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.groupService.create(createProjectDto);
  }
}
