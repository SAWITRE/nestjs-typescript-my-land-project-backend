import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { LandsModule } from 'src/lands/lands.module';

@Module({
  imports: [LandsModule], // โมดูลนี้ต้อง import เข้ามา
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
