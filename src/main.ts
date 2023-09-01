import { JwtStrategy } from './security/passport.jwt.strategy';
//import { RolesGuard } from './guard/roles.guard';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ credentials: true, origin: '*' });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // app.useGlobalGuards();

  await app.listen(process.env.PORT);
}
bootstrap();
