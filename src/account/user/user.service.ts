import { PrismaService } from '../../../prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto, SignInDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    await this.prisma.$transaction(async (prisma) => {
      const {
        nickname,
        password,
        confirmPassword,
        birthDate,
        gender,
        yearAndMonthOfEmployment,
      } = createUserDto;
      const existingUser = await this.prisma.user.findUnique({
        where: { nickname },
      });

      if (existingUser)
        throw new BadRequestException(`User(${nickname}) is exist.`);

      if (password !== confirmPassword)
        throw new BadRequestException(`비밀번호를 확인해 주세요`);

      const SALT = Number(process.env.SALT);
      const hashedPassword = await bcrypt.hash(password, SALT);

      const user = await prisma.user.create({
        data: {
          nickname,
          password: hashedPassword,
          birthDate,
          gender,
          yearAndMonthOfEmployment,
        },
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