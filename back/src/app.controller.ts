import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Movie } from './interfaces/movie.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("movies")
  async getMovies(@Query('page') page = 1): Promise<Movie[]> {
    return this.appService.getNowPlayingFrance(page);
  }

  @Get("upcoming")
  async getUpcomingMovies(@Query('page') page = 1): Promise<Movie[]> {
    return this.appService.getUpcomingFrance(page);
  }

  @Get("movie/:id")
  async getMovie(@Param('id') id: number): Promise<Movie> {
    return this.appService.getMovieById(Number(id));
  }
}
