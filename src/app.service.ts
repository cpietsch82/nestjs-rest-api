import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppInfo(): string {
    return 'A simple TODO Rest API';
  }
}
