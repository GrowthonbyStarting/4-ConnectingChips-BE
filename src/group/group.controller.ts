import { User } from '@prisma/client';
import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Get,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateProjectDto } from './dto/create-group.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLE } from 'src/constant/account.constant';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from 'src/decorators/user.decorator';

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

  @Get('/:groupId')
  @Roles(ROLE.USER)
  //@UseGuards(AuthGuard('jwt'))
  find(@getUser() user: User) {
    return this.groupService.getGroups(user);
  }
}
