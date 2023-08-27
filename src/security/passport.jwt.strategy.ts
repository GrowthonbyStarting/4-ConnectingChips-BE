import { ROLE } from './../constant/account.constant';
import { Admin } from '@prisma/client';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaService } from '../../prisma/prisma.service';

type Payload = {
  id: number;
  nickname: string;
  sub: string;
  role: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: Payload, done: VerifiedCallback): Promise<any> {
    console.log(payload);
    console.log(payload.id);
    const user = await this.prisma.user.findFirst({
      where: { id: payload.id },
    });
    console.log(user);
    if (!user) {
      return done(
        new UnauthorizedException({ message: 'user does not exist' }),
        false,
      );
    }
    delete user.password;
    return done(null, user);
  }
}
