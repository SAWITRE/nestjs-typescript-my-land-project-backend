import { Module } from '@nestjs/common';
import { LandsController } from './lands.controller';
import { LandsService } from './lands.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [LandsController],
  providers: [LandsService, PrismaService],
  exports: [LandsService],
})
export class LandsModule {}
