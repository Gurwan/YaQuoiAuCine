import type { Movie } from '$lib/types/movie';
import type { PageLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';

export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch(`${PUBLIC_API_URL}/movies`);
    const movies: Movie[] = await res.json();
    return { movies };
};