import { ImagesService } from '../image/images.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-group.dto';
import { Admin, User } from '@prisma/client';

@Injectable()
export class GroupService {
  constructor(
    private readonly prisma: PrismaService, // private readonly imagesService: ImagesService,
  ) {}
  async create(
    createProjectDto: CreateProjectDto,
    //  file: Express.Multer.File,
  ) {
    const { title, tabs, intro, rule } = createProjectDto;
    // const projectImage = await this.imagesService.create(file);
    // const image = { connect: { id: projectImage.id } };

    const project = await this.prisma.$transaction([
      this.prisma.group.create({
        data: {
          title,
          tabs,
          intro,
          rule,
          //image,
        },
      }),
    ]);
    return { result: `작심 생성 완료` };
  }

  async getGroups(user: User) {
    const info = await this.prisma.group.findMany({
      where: { id: user.id },
      include: { Post: true },
    });
    return info;
  }
}
