import { sign, JwtPayload } from 'jsonwebtoken';
import { PrismaService } from '../../../prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto, SignInDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ROLE } from 'src/constant/account.constant';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  async create(createUserDto: CreateUserDto) {
    await this.prisma.$transaction(async (prisma) => {
      const { nickname, password, confirmPassword } = createUserDto;
      const existingUser = await this.prisma.user.findUnique({
        where: { nickname },
      });

      if (existingUser)
        throw new BadRequestException(`이미 존재하는 닉네임 입니다.`);

      if (password !== confirmPassword)
        throw new BadRequestException(`비밀번호를 확인해 주세요`);

      const SALT = Number(process.env.SALT);
      const hashedPassword = await bcrypt.hash(password, SALT);

      const user = await prisma.user.create({
        data: { nickname, password: hashedPassword },
      });
    });
    return { result: '회원가입 성공' };
  }

  async login(signInDto: SignInDto) {
    const { nickname, password } = signInDto;

    const user = await this.prisma.user.findUnique({
      where: { nickname },
    });

    if (!user)
      throw new BadRequestException(`nickname 또는 password를 확인해주세요`);

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      throw new BadRequestException(`nickname 또는 password를 확인해주세요`);
    }
    const payload: JwtPayload = { sub: user.nickname, role: ROLE.USER };

    const secret = process.env.USER_JWT_SECRET;
    const expiresIn = '3h';
    const token = sign(payload, secret, { expiresIn });

    return {
      access_token: token,
    };
  }
}
