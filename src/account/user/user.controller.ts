import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, SignInDto } from './dto/create-user.dto';
import { getUser } from 'src/decorators/user.decorator';
import { User as TUser } from '@prisma/client';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Post('/sign-in')
  login(@Body() signInDto: SignInDto) {
    return this.userService.login(signInDto);
  }

  @Get('mylist')
  getList(@getUser() user: TUser) {
    console.log('here');
    return this.userService.find(user);
  }
}
