import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { generatorQrUtility } from './qrGenerator/qrcode.js';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async generatorQR(text: string, logo: Buffer) {
    try {
      return await generatorQrUtility(text, logo);
    } catch (error) {
      throw new HttpException(
        `Err: ${(error as any).message}. Please try again!`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
