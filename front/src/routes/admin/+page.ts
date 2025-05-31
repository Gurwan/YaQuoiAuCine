import { PUBLIC_TOKEN_BOXOFFICE } from '$env/static/public';
import type { MovieJson } from '$lib/types/movie-json';
import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch('http://localhost:3000/admin', {
        method: 'GET',
        headers: {
            Authorization: PUBLIC_TOKEN_BOXOFFICE
        }
    });
    const data: Record<string, MovieJson> = await res.json();
    return { data };
};