import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LandsModule } from './lands/lands.module';
import { PrismaService } from './prisma/prisma.service';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [LandsModule, AiModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],// ลงทะเบียนที่นี่เพื่อให้ทุกโมดูลใช้ได้
  exports: [PrismaService],   // ส่งออกให้โมดูลอื่นเรียกใช้
})
export class AppModule {}
