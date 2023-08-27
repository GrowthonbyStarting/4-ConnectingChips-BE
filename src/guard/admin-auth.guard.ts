import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const admin = request.user; // 또는 어떻게 관리자를 식별하는지에 따라 다름
    // 관리자인지 확인하고 적절한 논리를 사용하여 반환
    return admin && admin.role === 'admin';
  }
}
