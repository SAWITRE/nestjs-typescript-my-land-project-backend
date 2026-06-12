import { Injectable } from '@nestjs/common';
import { LandsService } from '../lands/lands.service';
import { GoogleGenerativeAI } from '@google/generative-ai'; // แนะนำใช้ Gemini ฟรีและดีครับ
import Groq from 'groq-sdk';

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;

  constructor(private landsService: LandsService) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error('GROQ_API_KEY environment variable is required');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async askAI(question: string) {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    //     const list = await groq.models.list();
    //   console.log(list.data.map(m => m.id)); // มันจะโชว์ชื่อรุ่นที่ใช้ได้ตอนนี้ใน Console

    // ในฟังก์ชันถาม
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: question }],
      model: 'llama-3.3-70b-versatile',
    });

    const answer = chatCompletion.choices[0]?.message?.content;
    console.log('AI ตอบว่า:', answer); // <--- ลองดูว่าตรงนี้มีค่าไหม

    return answer; // ต้องมีบรรทัดนี้ครับ! ถ้าไม่มี มันจะ return เป็น undefined

    // return chatCompletion.choices[0]?.message?.content;
    // try {
    //   // await this.listModels(); // เช็กโมเดลที่มีสิทธิ์ใช้ก่อน
    //   const lands = await this.landsService.findAll(); // ดึงข้อมูลที่ดินทั้งหมด
    //   const model = this.genAI.getGenerativeModel({
    //     model: 'gemini-2.0-flash',
    //   });

    //   const prompt = `
    //   นี่คือข้อมูลที่ดินในฐานข้อมูล: ${JSON.stringify(lands)}
    //   คำถามของผู้ใช้: ${question}
    //   คำสั่ง: ตอบคำถามโดยอิงจากข้อมูลที่ให้มาเท่านั้น หากข้อมูลไม่มีให้บอกว่าไม่มีข้อมูล
    // `;

    //   const result = await model.generateContent(prompt);
    //   return result.response.text();
    // } catch (error: any) {
    //   if (error.status === 429 && retryCount < 3) {
    //     console.log('ติด Limit, กำลังลองใหม่ใน 5 วินาที...');
    //     await new Promise((resolve) => setTimeout(resolve, 5000)); // หน่วงเวลา 5 วินาที
    //     return this.askAI(question, retryCount + 1); // ลองซ้ำ
    //   }
    //   throw error;
    // }
  }

  //   async listModels() {
  //     const response = await fetch(
  //       `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GROQ_API_KEY}`,
  //     );

  //     const data = await response.json();
  //     console.log(data);
  //   }
}
