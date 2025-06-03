import { PUBLIC_TOKEN_BOXOFFICE, PUBLIC_API_URL } from '$env/static/public';
import type { MovieJson } from '$lib/types/movie-json';
import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch(`${PUBLIC_API_URL}/admin`, {
        method: 'GET',
        headers: {
            Authorization: PUBLIC_TOKEN_BOXOFFICE
        }
    });
    const data: Record<string, MovieJson> = await res.json();
    return { data };
};