import type { MovieJson } from "./movie-json";

export interface Movie {
    id: number;
    title: string;
    poster?: string;
    release_date: string;
    rating: number;
    overview: string;
    json?: MovieJson;
}