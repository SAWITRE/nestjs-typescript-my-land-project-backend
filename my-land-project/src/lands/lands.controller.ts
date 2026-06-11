import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { LandsService } from './lands.service';
import { CreateLandDto } from './dto/create-land.dto/create-land.dto';

@Controller('lands')
export class LandsController {
  // ดึงเอา LandsService เข้ามาใช้งานผ่าน constructor
  constructor(private readonly landsService: LandsService) {}

  @Get('/:id') // ดักรับพารามิเตอร์ ID เช่น /lands/48
  async getLand(@Param('id') id: string) {
    const landId = parseInt(id); // แปลง id จาก string ให้เป็นตัวเลข number ก่อนส่งต่อ

    // ส่งเลข ID ไปให้ Service คำนวณและหาข้อมูลมาให้
    const result = await this.landsService.getLandById(landId);
    return result;
  }

  // ในไฟล์ lands.controller.ts
  @Get()
  async findAll() {
    return await this.landsService.findAll();
  }

  // ในไฟล์ lands.controller.ts
  @Post()
  async create(@Body() createLandDto: CreateLandDto) {
    return await this.landsService.create(createLandDto);
  }

  @Patch(':id') // ใช้ Patch สำหรับการแก้ไขข้อมูลบางส่วน
  update(@Param('id') id: string, @Body() updateLandDto: CreateLandDto) {
    return this.landsService.update(+id, updateLandDto); // แปลง id จาก string เป็น number
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.landsService.remove(+id);
  }
}
