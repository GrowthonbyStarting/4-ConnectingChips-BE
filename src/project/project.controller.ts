import { ROLE } from './../constant/account.constant';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('/regist')
  @UseInterceptors(FileInterceptor('file'))
  @Roles(ROLE.ADMIN)
  create(
    @Body() createProjectDto: CreateProjectDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.projectService.create(createProjectDto, file);
  }

  // @Get()
  // findAll() {
  //   return this.projectService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.projectService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
  //   return this.projectService.update(+id, updateProjectDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.projectService.remove(+id);
  // }
}
