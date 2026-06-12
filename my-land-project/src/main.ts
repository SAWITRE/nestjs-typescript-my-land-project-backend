import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // เพิ่มตัวนี้เข้าไป!
    }),
  );
  // เพิ่มบรรทัดนี้: อนุญาตให้ Next.js (Port 3001) เข้ามาดึงข้อมูลได้
  app.enableCors({
    origin: 'http://localhost:3001',
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
