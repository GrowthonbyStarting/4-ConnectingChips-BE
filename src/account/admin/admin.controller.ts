import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto, SignInDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('sign-up')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Post('Sign-in')
  login(@Body() siginInDto: SignInDto) {
    return this.adminService.login(siginInDto);
  }
}
