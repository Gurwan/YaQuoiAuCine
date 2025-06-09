import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Movie, MovieDetails, MovieDetailsResponse, MovieResponse } from '../interfaces/movie.interface';
import { BoxofficeService } from './boxoffice.service';
import { Genre } from 'src/interfaces/genre.interface';

@Injectable()
export class AppService {

  private apiKey: string;

  constructor(
    private configService: ConfigService,
    private boxofficeService: BoxofficeService,
    private httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.apiKey = this.configService.get<string>('TMDB_API_KEY') ?? "";
  }

  async getNowPlayingFrance(page = 1): Promise<Movie[]> {
    const cacheKey = `movies-theater:page-${page}`;

    const cached = await this.cacheManager.get<Movie[]>(cacheKey);
    if (cached) {
      return this.filterHiddenMovies(cached);
    }

    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&language=fr-FR&region=FR`;
    const moviesResults: Movie[] = [];

    for (let i = 1; i <= page * 5; i++) {
      const urlPage = `${url}?api_key=${this.apiKey}&language=fr-FR&region=FR&page=${i}`;
      const response = await this.httpService.axiosRef.get(urlPage);

      const mappedMovie = response.data.results.filter((movie: MovieResponse) => {
        const releaseDate = new Date(movie.release_date);
        return !isNaN(releaseDate.getTime()) && releaseDate <= new Date();
      }).map(async (movie: MovieResponse): Promise<Movie> => ({
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path,
        genres: await this.getGenresById(movie.genre_ids),
        release_date: Intl.DateTimeFormat('fr-FR').format(new Date(movie.release_date)),
        rating: Number(movie.vote_average.toFixed(2)),
        overview: movie.overview,
        language: movie.original_language,
        json: this.boxofficeService.getOrInit(movie.title)
      }));

      const resolvedMovies = await Promise.all(mappedMovie);
      moviesResults.push(...resolvedMovies);
    }

    this.boxofficeService.clear(moviesResults.map(movie => movie.title));

    await this.cacheManager.set(cacheKey, moviesResults);

    return this.filterHiddenMovies(moviesResults);
  }

  async getUpcomingFrance(page = 1): Promise<Movie[]> {
    const cacheKey = `movies-upcoming:page-${page}`;

    const cached = await this.cacheManager.get<Movie[]>(cacheKey);
    if (cached) {
      return this.sortByDate(cached);
    }

    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.apiKey}&language=fr-FR&region=FR`;
    const moviesResults: Movie[] = [];

    for (let i = 1; i <= page * 5; i++) {
      const urlPage = `${url}?api_key=${this.apiKey}&language=fr-FR&region=FR&page=${i}`;
      const response = await this.httpService.axiosRef.get(urlPage);

      const mappedMovie = response.data.results.map(async (movie: MovieResponse): Promise<Movie> => ({
        id: movie.id,
        title: movie.title,
        genres: await this.getGenresById(movie.genre_ids),
        poster: movie.poster_path,
        release_date: Intl.DateTimeFormat('fr-FR').format(new Date(movie.release_date)),
        rating: Number(movie.vote_average.toFixed(2)),
        overview: movie.overview,
        language: movie.original_language
      }));

      const resolvedMovies = await Promise.all(mappedMovie);
      moviesResults.push(...resolvedMovies);
    }
    await this.cacheManager.set(cacheKey, moviesResults);

    return this.sortByDate(moviesResults);
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
      release_date: Intl.DateTimeFormat('fr-FR').format(new Date(response.release_date)),
      rating: Number(response.vote_average.toFixed(2)),
      overview: response.overview,
      budget: response.budget,
      revenue: response.revenue,
      genres: response.genres.map((genre) => genre.name),
      countries: response.production_countries.map((country) => country.iso_3166_1),
      popularity: response.popularity,
      json: this.boxofficeService.getOrInit(response.title),
      background: response.backdrop_path,
      studios: response.production_companies.map((company) => ({
        name: company.name,
        country: company.origin_country
      })),
      duration: this.durationToReadableFormat(response.runtime),
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

  async getGenres(): Promise<Genre[]> {
    const cacheKey = `genres`;

    const cached = await this.cacheManager.get<Genre[]>(cacheKey);
    if (cached) {
      return cached;
    }

    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=fr-FR`;
    const response = await this.httpService.axiosRef.get(url);
    const genres: Genre[] = response.data.genres;
    await this.cacheManager.set(cacheKey, genres);

    return genres;
  }

  private async getGenresById(ids: number[]): Promise<string[]> {
    const genres = await this.getGenres();
    const filteredGenres = genres.filter(genre => ids.includes(genre.id));
    return filteredGenres.map(genre => genre.name);
  }

  private durationToReadableFormat(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    let ret = '';

    if (hours > 0 && minutes > 0) {
      ret = `${hours}h ${minutes}min`;
    } else if (hours > 0) {
      ret = `${hours}h`;
    } else {
      ret = `${minutes}min`;
    }

    return ret;
  }

  private filterHiddenMovies(movies: Movie[]): Movie[] {
    const hiddenMoviesJson = this.boxofficeService.getHidden();

    return movies.filter(movie => !(movie.title in hiddenMoviesJson));
  }

  private sortByDate(movies: Movie[]): Movie[] {
    const sortedMovies = movies.sort((a, b) => {
      return new Date(this.convertToISO(a.release_date)).getTime() - new Date(this.convertToISO(b.release_date)).getTime();
    });
    return sortedMovies;
  }

  private convertToISO(dateStr) {
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
  }
}
