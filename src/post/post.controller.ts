import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

import { User as TUser } from '@prisma/client';
import { ROLE } from 'src/constant/account.constant';
import { Roles } from 'src/decorators/roles.decorator';
import { getUser } from 'src/decorators/user.decorator';
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/:groupId')
  @Roles(ROLE.USER)
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
    @Param('groupId') groupId: number,
    @getUser() user: TUser,
  ) {
    return this.postService.create(createPostDto, groupId, user, file);
  }
}
