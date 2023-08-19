import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './../../../prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  async create(createAdminDto: CreateAdminDto) {
    await this.prisma.$transaction(async (prisma) => {
      const { email, password } = createAdminDto;
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });

      if (existingUser)
        throw new BadRequestException(`User(${email}) is exist.`);

      const SALT = Number(process.env.SALT);
      const hashedPassword = await bcrypt.hash(password, SALT);

      const admin = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
    });
    return { result: '회원가입 성공' };
  }
}
