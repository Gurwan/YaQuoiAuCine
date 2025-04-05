import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  constructor(
    private configService: ConfigService,
    private httpService: HttpService
  ) {}
  
  async getNowPlayingFrance() {
    const apiKey = this.configService.get<string>('TMDB_API_KEY');
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=fr-FR&region=FR`;

    const response = await this.httpService.axiosRef.get(url);
    return response.data;
  }

}
