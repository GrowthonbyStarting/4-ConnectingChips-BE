import { ImagesService } from './../image/images.service';
import { PrismaService } from './../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imagesService: ImagesService,
  ) {}
  async create(createProjectDto: CreateProjectDto, file: Express.Multer.File) {
    const { title, type, roles, contents } = createProjectDto;
    const projectImage = await this.imagesService.create(file);

    const project = this.prisma.project.create({
      title,
      tabs: type,
      roles,
      contents,
      image: { connect: { id: projectImage.id } },
    });
  }

  // findAll() {
  //   return `This action returns all project`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} project`;
  // }

  // update(id: number, updateProjectDto: UpdateProjectDto) {
  //   return `This action updates a #${id} project`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} project`;
  // }
}
