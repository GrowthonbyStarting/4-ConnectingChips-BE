import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateProjectDto } from './dto/create-group.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Admin } from '../decorators/admin.decorator';
import { Admin as TAdmin } from '@prisma/client';
@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('/regist')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body()
    createProjectDto: CreateProjectDto,
    @UploadedFile() file: Express.Multer.File,
    @Admin() admin: TAdmin,
  ) {
    return this.groupService.create(createProjectDto);
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
