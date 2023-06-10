import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/protected')
  getHello(): string {
    return this.appService.getHello();
  }
}
