import { PrismaService } from './../../prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto, SignInDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  async create(createUserDto: CreateUserDto) {
    await this.prisma.$transaction(async (prisma) => {
      const { email, password } = createUserDto;
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });

      if (existingUser)
        throw new BadRequestException(`User(${email}) is exist.`);

      const SALT = Number(process.env.SALT);
      const hashedPassword = await bcrypt.hash(password, SALT);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
    });
    return { result: '회원가입 성공' };
  }

  async login(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user)
      throw new BadRequestException(`email이나 password를 확인해주세요`);

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      throw new BadRequestException(`password(${password}) is not equal.`);
    }
    const payload = { id: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
