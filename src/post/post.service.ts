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
    //  file: Express.Multer.File,
    groupId: number,
    user: User,
  ) {
    // const projectImage = await this.imagesService.create(file);
    // const image = { connect: { id: projectImage.id } };
    const { contents } = createPostDto;
    // const post = await this.prisma.$transaction([
    //   this.prisma.post.create({
    //     data: {
    //       contents,
    //       groupId,
    //       userId: user.id,
    //     },
    //   }),
    // ]);
    console.log(user);
  }
}
