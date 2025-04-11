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