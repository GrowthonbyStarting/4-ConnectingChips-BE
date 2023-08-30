import { PrismaService } from './../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { ImagesService } from 'src/image/images.service';
import { User } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imageService: ImagesService,
  ) {}
  async create(
    createPostDto: CreatePostDto,
    groupId: number,
    user: User,
    file: Express.Multer.File,
  ) {
    await this.prisma.$transaction(async (prisma) => {
      const { contents } = createPostDto;
      const postImage = await this.imageService.create(file);
      const post = await this.prisma.post.create({
        data: {
          contents,
          userId: user.id,
          groupId,
          image: { connect: { id: postImage.id } },
        },
      });
    });

    return { result: `post 생성완료` };
  }

  async findPost(postId: number) {
    const post = this.prisma.post.findMany({
      where: { id: postId },
      include: { image: true, Comment: true },
    });
    return post;
  }
}
