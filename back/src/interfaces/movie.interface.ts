export interface Movie {
    title: string;
    poster?: string;
    release_date: string;
    rating: number;
    overview: string;   
}

export interface MovieResponse {
    title: string; 
    poster_path?: string;
    release_date: string;
    vote_average: number;
    overview: string;
}