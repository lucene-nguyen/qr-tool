import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service.js';
import { text } from 'stream/consumers';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('qr')
  @UseInterceptors(FileInterceptor('logo'))
  async generatorQR(
    @Body('text') text: string,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    console.log(text);
    const stream = await this.appService.generatorQR(text, file.buffer);
    stream.pipe(res);
  }
}
