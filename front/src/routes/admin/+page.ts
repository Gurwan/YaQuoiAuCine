import { PUBLIC_TOKEN_BOXOFFICE } from '$env/static/public';
import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch('http://localhost:3000/boxoffice', {
        method: 'GET',
        headers: {
            Authorization: PUBLIC_TOKEN_BOXOFFICE
        }
    });
    const data: Record<string, string> = await res.json();
    return { data };
};