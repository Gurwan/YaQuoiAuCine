export interface Movie {
    id: number;
    title: string;
    poster?: string;
    release_date: string;
    rating: number;
    overview: string;   
    revenue?: number;
    budget?: number;
}

export interface MovieResponse {
    id: number;
    title: string; 
    poster_path?: string;
    release_date: string;
    vote_average: number;
    overview: string;
    revenue?: number;
    budget?: number;
}