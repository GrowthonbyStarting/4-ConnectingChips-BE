import { ImagesService } from '../image/images.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-group.dto';
import { targetModulesByContainer } from '@nestjs/core/router/router-module';

@Injectable()
export class GroupService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imagesService: ImagesService,
  ) {}
  async create(createProjectDto: CreateProjectDto, file: Express.Multer.File) {
    console.log(createProjectDto);
    //const { title, type, intro, rule } = createProjectDto;
    // const projectImage = await this.imagesService.create(file);
    // const projectTabs = {
    //   create: type.localeCompare()
    // }
    // const project = await this.prisma.project.create({
    //   data: {
    //     title,
    //     tabs,
    //     rolse,
    //     contents,
    //   },
    // });
    //   //image: { connect: { id: projectImage.id } },
    // console.log(project);
    // return { result: `작심 생성 완료` };
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
