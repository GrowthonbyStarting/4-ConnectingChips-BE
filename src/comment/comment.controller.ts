import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ROLE } from 'src/constant/account.constant';
import { Roles } from 'src/decorators/roles.decorator';
import { getUser } from 'src/decorators/user.decorator';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User as TUser } from '@prisma/client';
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/:postId')
  @Roles(ROLE.USER)
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('postId', ParseIntPipe) postId: number,
    @getUser() user: TUser,
  ) {
    return this.commentService.create(createCommentDto, postId, user);
  }

  @Get('/:postId')
  @Roles(ROLE.USER)
  findAll(@Param('postId', ParseIntPipe) postId: number) {
    return this.commentService.findAll(postId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
