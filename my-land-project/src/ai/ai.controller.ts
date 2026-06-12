import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  async chat(@Body('question') question: string) {
    console.log('Body ที่ได้รับจากหน้าบ้าน:', { question }); // เช็กว่ามี { question: "..." } จริงไหม
    const result = await this.aiService.askAI(question);
    return { reply: result };
  }
}
