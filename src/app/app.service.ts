import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  async getHello(): Promise<string> {
    return 'Hello World!';
  }
}
