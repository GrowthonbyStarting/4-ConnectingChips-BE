import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './../../../prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateAdminDto, SignInDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  async create(createAdminDto: CreateAdminDto) {
    await this.prisma.$transaction(async (prisma) => {
      const { nickname, password } = createAdminDto;
      const existingUser = await this.prisma.admin.findUnique({
        where: { nickname },
      });

      if (existingUser)
        throw new BadRequestException(`User(${nickname}) is exist.`);

      const SALT = Number(process.env.ADMIN_SALT);
      const hashedPassword = await bcrypt.hash(password, SALT);

      const admin = await prisma.admin.create({
        data: {
          nickname,
          password: hashedPassword,
        },
      });
    });
    return { result: '회원가입 성공' };
  }
  async login(signInDto: SignInDto) {
    const { nickname, password } = signInDto;

    const user = await this.prisma.admin.findUnique({
      where: { nickname },
    });

    if (!user)
      throw new BadRequestException(`email이나 password를 확인해주세요`);

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      throw new BadRequestException(`email이나 password를 확인해주세요`);
    }
    const payload = { id: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
