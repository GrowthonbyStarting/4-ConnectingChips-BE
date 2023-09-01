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
  async create(
    createProjectDto: CreateProjectDto,
    file: Express.Multer.File,
    user: User,
  ) {
    await this.prisma.$transaction(async (prisma) => {
      const { title, tabs, intro, rule } = createProjectDto;
      const groupImage = await this.imagesService.create(file);
      const group = await this.prisma.$transaction([
        this.prisma.group.create({
          data: {
            title,
            tabs,
            intro,
            rule,
            Image: { connect: { id: groupImage.id } },
          },
        }),
      ]);
    });
    return { result: '작심 생성 완료' };
  }

  async join(groupId: number, user: User) {
    const join = await this.prisma.userJoinGroup.create({
      data: {
        userId: user.id,
        groupId,
      },
    });
    return { result: '그룹 참여 완료' };
  }

  async getGroups(groupId: number) {
    console.log(groupId);
    const info = await this.prisma.group.findMany({
      where: { id: groupId },
      include: {
        Image: true,
        Post: {
          include: { image: true, Comment: true },
        },
      },
    });

    return info;
  }
}
