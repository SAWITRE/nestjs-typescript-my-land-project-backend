import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLandDto } from './dto/create-land.dto/create-land.dto';

@Injectable()
export class LandsService {
  constructor(private readonly prisma: PrismaService) {} // ใช้งาน Prismas
  // ฟังก์ชันจำลองการดึงข้อมูลจากฐานข้อมูล
  /*  async getLandById(id: number) {
    // สมมติว่าในฐานข้อมูลเรามีข้อมูลแปลงที่ 48 อยู่แปลงเดียวก่อน
    if (id === 48) {
      return {
        id: 48,
        title: 'แปลงที่ดิน นายเหรียญชมภูพื้น',
        size: 58.3,
        unit: 'ตร.ว.',
        coordinates: { x: 445006, y: 1694594 },
      };
    }

    // 🚨 ถ้าผู้ใช้ส่ง ID อื่นมาที่ไม่ใช่ 48 ให้โยน Error บอกว่าไม่เจอข้อมูล
    throw new NotFoundException(`ไม่พบข้อมูลที่ดินรหัส ${id} ในระบบ`);
  }*/
  async getLandById(id: number) {
    // สั่งยิงคำสั่งไปหาที่ดินใน DB ตาม ID
    const land = await this.prisma.land.findUnique({
      where: { id: id },
    });

    if (!land) {
      throw new NotFoundException(`ไม่พบข้อมูลที่ดินรหัส ${id}`);
    }

    return land;
  }

  async findAll() {
    return await this.prisma.land.findMany();
  }

  // ในไฟล์ lands.service.ts
  async create(data: CreateLandDto) {
    return await this.prisma.land.create({
      data: data,
    });
  }

  async update(id: number, data: CreateLandDto) {
    // ตรวจสอบก่อนว่ามีที่ดินแปลงนี้จริงไหม
    const land = await this.prisma.land.findUnique({ where: { id } });
    if (!land) {
      throw new NotFoundException(`Land with ID ${id} not found`);
    }

    return await this.prisma.land.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number) {
    // ตรวจสอบก่อนว่ามีที่ดินแปลงนี้จริงไหม
    const land = await this.prisma.land.findUnique({ where: { id } });
    if (!land) {
      throw new NotFoundException(`Land with ID ${id} not found`);
    }

    return await this.prisma.land.delete({
      where: { id },
    });
  }
}
