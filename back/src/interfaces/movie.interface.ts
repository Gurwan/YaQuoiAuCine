export interface MovieResponse {
    id: number;
    title: string; 
    poster_path?: string;
    release_date: string;
    vote_average: number;
    overview: string;
}

export interface Movie {
    id: number;
    title: string;
    poster?: string;
    release_date: string;
    rating: number;
    overview: string;   
}

interface MoviePeople {
    name: string;
    profile_path?: string;
}

export interface MovieCast extends MoviePeople {
    character: string;
}

export interface MovieCrew extends MoviePeople {
    name: string;
    profile_path?: string;
    job: string;
}

export interface MovieCredits {
    cast: MovieCast[];
    crew: MovieCrew[];
}

export interface MovieDetailsResponse extends MovieResponse {
    revenue?: number;
    budget?: number;
    genres: {name: string}[];
    production_countries: {iso_3166_1: string}[];
    popularity: number;
    production_companies: {name: string, origin_country: string}[];
    runtime: number;
    backdrop_path: string;
    credits: MovieCredits;
}

export interface MovieDetails extends Movie {
    revenue?: number;
    budget?: number;
    genres: string[];
    countries: string[];
    popularity: number;
    studios: {name: string, country: string}[];
    duration: number;
    background: string;
    credits: MovieCredits;
}

