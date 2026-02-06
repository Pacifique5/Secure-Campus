import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(helmet());
  
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    }),
  );
  
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:5173', process.env.FRONTEND_URL].filter(Boolean),
    credentials: true,
  });
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 SecureCampus API running on port ${port}`);
}
bootstrap();
