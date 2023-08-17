import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '너는 또 왜 안되는건데!!1';
  }
}
