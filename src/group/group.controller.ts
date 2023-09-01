import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateProjectDto } from './dto/create-group.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLE } from 'src/constant/account.constant';
import { getUser } from 'src/decorators/user.decorator';
import { User as TUser } from '@prisma/client';
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
    @getUser() user: TUser,
  ) {
    return this.groupService.create(createProjectDto, file, user);
  }

  @Post('/:groupId')
  @Roles(ROLE.USER)
  joinGroup(
    @Param('groupId', ParseIntPipe) groupId: number,
    @getUser() user: TUser,
  ) {
    return this.groupService.join(groupId, user);
  }

  @Get('/:groupId')
  @Roles(ROLE.USER)
  find(@Param('groupId', ParseIntPipe) groupId: number) {
    return this.groupService.getGroups(groupId);
  }
}
