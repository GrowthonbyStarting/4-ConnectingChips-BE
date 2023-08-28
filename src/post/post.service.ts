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
    const projectImage = await this.imageService.create(file);
    const image = { connect: { id: projectImage.id } };
    const { contents } = createPostDto;
    const id = Number(groupId);

    // const post = await this.prisma.$transaction([
    //   this.prisma.post.create({
    //     data: {
    //       contents,
    //       groupId: id,
    //       userId: user.id,
    //       image,
    //     },
    //   }),
    // ]);
    // return { result: `post 생성완료` };
  }
}
