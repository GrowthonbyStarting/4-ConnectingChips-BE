import { PrismaService } from './../../prisma/prisma.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ROLE } from 'src/constant/account.constant';

const USER_JWT_SECRET = process.env.USER_JWT_SECRET;
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET;
@Injectable()
export class InjectAccountMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}

  async use(req: Request, _: Response, next: NextFunction) {
    if (req.baseUrl.includes('refresh-token')) return next();

    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) return next();

    const { role } = jwt.decode(token) as {
      role: ROLE;
    };

    if (role !== ROLE.USER && role !== ROLE.ADMIN)
      throw new Error('INVALID_TOKEN');

    try {
      if (role === ROLE.USER) {
        const { sub } = jwt.verify(token, USER_JWT_SECRET);
        const args: Prisma.UserFindUniqueArgs = {
          where: { nickname: sub as string },
        };
        const user = await this.prismaService.user.findUnique(args);
        delete user.password;

        req.user = user;
      }

      if (role === ROLE.ADMIN) {
        const { sub } = jwt.verify(token, ADMIN_JWT_SECRET);
        const args = { where: { nickname: sub as string } };
        const admin = await this.prismaService.admin.findFirst(args);
        req.admin = admin;
      }

      next();
    } catch (e) {
      const errorName = (e as Error).name;
      console.log((e as Error).message, (e as Error).stack);
      throw new Error(errorName);
    }
  }
}
