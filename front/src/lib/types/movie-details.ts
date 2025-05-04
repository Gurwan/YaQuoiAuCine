import type { Movie } from "./movie";

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

export interface MovieDetails extends Movie {
    revenue?: number;
    budget?: number;
    genres: string[];
    countries: string[];
    popularity: number;
    studios: {name: string, country: string}[];
    duration: string;
    background: string;
    credits: MovieCredits;
}
