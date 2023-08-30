import { PrismaService } from './../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from '@prisma/client';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCommentDto: CreateCommentDto, postId: number, user: User) {
    const { text } = createCommentDto;
    const comment = await this.prisma.comment.create({
      data: {
        text,
        postId,
        userId: user.id,
      },
    });
    return { result: '댓글 저장 완료' };
  }

  async findAll(postId: number) {
    const comment = await this.prisma.comment.findMany({
      where: { postId },
    });
    return comment;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
