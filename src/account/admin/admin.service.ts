import { ROLE } from './../../constant/account.constant';
// import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './../../../prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateAdminDto, SignInDto } from './dto/create-admin.dto';

import * as bcrypt from 'bcrypt';
import { JwtPayload, sign } from 'jsonwebtoken';
@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}
  async create(createAdminDto: CreateAdminDto) {
    await this.prisma.$transaction(async (prisma) => {
      const { nickname, password, adminSignUpSecret } = createAdminDto;

      if (adminSignUpSecret !== process.env.ADMIN_SIGNUP_SECRET)
        throw new BadRequestException('');
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

    const admin = await this.prisma.admin.findUnique({
      where: { nickname },
    });

    if (!admin)
      throw new BadRequestException(`nickname이나 password를 확인해주세요`);

    const validatePassword = await bcrypt.compare(password, admin.password);

    if (!nickname || !validatePassword) {
      throw new BadRequestException(`nickname이나 password를 확인해주세요`);
    }
    const payload: JwtPayload = {
      sub: admin.nickname,
      role: ROLE.ADMIN,
    };
    const secret = process.env.ADMIN_JWT_SECRET;
    const expiresIn = '3h';
    const token = sign(payload, secret, { expiresIn });

    return {
      access_token: token,
    };
  }
}
