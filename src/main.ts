import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from './config/config.type';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger:['error', 'warn', 'log', 'debug', 'verbose']
  });
  const configService = app.get(ConfigService<AllConfigType>);
  app.useGlobalPipes(new ValidationPipe({}));
  const port = configService.getOrThrow('app.port', { infer: true });
  // const reflector = app.get(Reflector);
  // app.useGlobalGuards(new RolesGuard(reflector));
  app.enableCors({
    origin: "http://localhost:3000", // Allow frontend domain
    credentials: true, // Allow cookies if needed
  });

  await app.listen(port);
  console.log(
    '\x1b[32m%s\x1b[0m',
    `Application is running on: http://localhost:${port}`,
  );
}
bootstrap();
