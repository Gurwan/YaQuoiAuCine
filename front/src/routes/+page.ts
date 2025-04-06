import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch('http://localhost:3000/movies');
    const movies = await res.json();
    return { movies };
};