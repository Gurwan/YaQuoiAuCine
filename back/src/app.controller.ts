import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("movies")
  async getMovies(@Query('page') page = 1): Promise<any> {
    return this.appService.getNowPlayingFrance(page);
  }
}
