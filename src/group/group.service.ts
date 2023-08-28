import { ImagesService } from 'src/image/images.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-group.dto';
import { Admin, User } from '@prisma/client';

@Injectable()
export class GroupService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imagesService: ImagesService,
  ) {}
  async create(createProjectDto: CreateProjectDto, file: Express.Multer.File) {
    const { title, tabs, intro, rule } = createProjectDto;
    const groupImage = await this.imagesService.create(file);

    const group = await this.prisma.$transaction([
      this.prisma.group.create({
        data: {
          title,
          tabs,
          intro,
          rule,
          imageId: groupImage.id,
        },
      }),
    ]);
  }

  async getGroups(groupId: number) {
    console.log(groupId);
    const info = await this.prisma.group.findMany({
      where: { id: groupId },
      include: {
        image: true,
        Post: { include: { image: true } },
      },
    });
    console.log(info);
    return info;
  }
}
