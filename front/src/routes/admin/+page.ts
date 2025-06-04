import { PUBLIC_TOKEN_BOXOFFICE, PUBLIC_API_URL } from '$env/static/public';
import type { MovieJson } from '$lib/types/movie-json';
import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ fetch }) => {
    try {
        const res = await fetch(`${PUBLIC_API_URL}/admin`, {
            method: 'GET',
            headers: {
                Authorization: PUBLIC_TOKEN_BOXOFFICE
            }
        });

        if (!res.ok) {
            console.error(`Erreur HTTP ${res.status} : ${res.statusText}`);
            throw new Error(`Échec de la requête à l'API /admin`);
        }

        const data: Record<string, MovieJson> = await res.json();
        return { data };

    } catch (error) {
        console.error('Erreur lors du chargement des données admin :', error);
        return { data: {} };
    }
};