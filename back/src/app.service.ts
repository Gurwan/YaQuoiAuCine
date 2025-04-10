import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Movie, MovieResponse } from './interfaces/movie.interface';

@Injectable()
export class AppService {

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  async getNowPlayingFrance(page = 1): Promise<Movie[]> {
    const apiKey = this.configService.get<string>('TMDB_API_KEY');
    const cacheKey = `movies-in-theater:page-${page}`;

    const cached = await this.cacheManager.get<Movie[]>(cacheKey);
    if (cached) {
      return cached;
    }

    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=fr-FR&region=FR`;
    const moviesResults: Movie[] = [];

    for (let i = 1; i <= page * 3; i++) {
      const urlPage = `${url}?api_key=${apiKey}&language=fr-FR&region=FR&page=${i}`;
      const response = await this.httpService.axiosRef.get(urlPage);

      const mappedMovie = response.data.results.map((movie: MovieResponse): Movie => ({
        title: movie.title,
        poster: movie.poster_path,
        release_date: movie.release_date,
        rating: movie.vote_average,
        overview: movie.overview,
      }));

      moviesResults.push(...mappedMovie);
    }
    await this.cacheManager.set(cacheKey, moviesResults);

    return moviesResults;
  }
}
