import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Movie, MovieDetails, MovieDetailsResponse, MovieResponse } from './interfaces/movie.interface';
import axios from 'axios';

@Injectable()
export class AppService {

  private apiKey: string;

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.apiKey = this.configService.get<string>('TMDB_API_KEY') ?? "";
  }

  async getNowPlayingFrance(page = 1): Promise<Movie[]> {
    const cacheKey = `movies-theater:page-${page}`;

    const cached = await this.cacheManager.get<Movie[]>(cacheKey);
    if (cached) {
      return cached;
    }

    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&language=fr-FR&region=FR`;
    const moviesResults: Movie[] = [];

    for (let i = 1; i <= page * 5; i++) {
      const urlPage = `${url}?api_key=${this.apiKey}&language=fr-FR&region=FR&page=${i}`;
      const response = await this.httpService.axiosRef.get(urlPage);

      const mappedMovie = response.data.results.map((movie: MovieResponse): Movie => ({
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path,
        release_date: movie.release_date,
        rating: movie.vote_average,
        overview: movie.overview,
        language: movie.original_language
      }));

      moviesResults.push(...mappedMovie);
    }

    const moviesSorted = this.sortMoviesResults(moviesResults);

    await this.cacheManager.set(cacheKey, moviesSorted);

    return moviesSorted;
  }

  private sortMoviesResults(moviesResults: Movie[]) {
    const frenchMovies = moviesResults
    .slice(7)
    .filter(movie => movie.language === 'fr')
    .slice(0, 6);

    const frenchMovieIds = new Set(frenchMovies.map(m => m.id));
    const filteredMovies = moviesResults.filter(m => !frenchMovieIds.has(m.id));

    const result = [
      ...filteredMovies.slice(0, 7),   
      ...frenchMovies,                 
      ...filteredMovies.slice(7)       
    ];

    return result;
  }

  async getMovieById(id: number): Promise<Movie> {
    const cacheKey = `movie:id-${id}`;

    const cached = await this.cacheManager.get<Movie>(cacheKey);
    if (cached) {
      return cached;
    }

    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}&append_to_response=credits&language=fr-FR`;
    const response: MovieDetailsResponse = (await this.httpService.axiosRef.get(url)).data;
    const movie: MovieDetails = {
      id: response.id,
      title: response.title,
      poster: response.poster_path,
      release_date: response.release_date,
      rating: response.vote_average,
      overview: response.overview,
      budget: response.budget,
      revenue: response.revenue,
      genres: response.genres.map((genre) => genre.name),
      countries: response.production_countries.map((country) => country.iso_3166_1),
      popularity: response.popularity,
      background: response.backdrop_path,
      studios: response.production_companies.map((company) => ({
        name: company.name,
        country: company.origin_country
      })),
      duration: response.runtime,
      credits: {
        cast: response.credits.cast.map((person) => ({
          name: person.name,
          profile_path: person.profile_path,
          character: person.character
        })),
        crew: response.credits.crew.map((person) => ({
          name: person.name,
          profile_path: person.profile_path,
          job: person.job
        }))
      }
    };

    await this.cacheManager.set(cacheKey, movie);

    return movie;
  }

  async removeBackgroundFromUrl(url: string): Promise<string> {
    const tmdbImageUrl = `https://image.tmdb.org/t/p/original${url}`;
    const imageResponse = await this.httpService.axiosRef.get(tmdbImageUrl, {
      responseType: 'arraybuffer'
    });
  
   return "";
  }
}
