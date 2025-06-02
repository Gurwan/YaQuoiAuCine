<script lang="ts">
	import type { Movie } from '$lib/types/movie';
	import { getContext } from 'svelte';
	import MoviePanel from '../components/MoviePanel.svelte';
	import Movies from '../components/Movies.svelte';
	import { type Writable } from 'svelte/store';

	let data = $props();
	let movies: Movie[] = data.data.movies;

	movies = [...movies]
		.sort((a, b) => (a.json?.position ?? 0) - (b.json?.position ?? 0))
		.filter(
			((movie) => {
				const seenTitles = new Set();
				return (m) => {
					if (seenTitles.has(m.title)) {
						return false;
					}
					seenTitles.add(m.title);
					return true;
				};
			})()
		);

	const searchInput = getContext<Writable<string>>('searchInput');

	let selectedMovie = $state();
</script>

<div class="relative mt-6 flex flex-col gap-4 md:flex-row">
	{#if selectedMovie}
		<div class="w-full md:w-1/2">
			<Movies {movies} bind:details={selectedMovie} bind:filter={$searchInput} />
		</div>

		<MoviePanel bind:selectedMovie />
	{:else}
		<div class="w-full">
			<Movies {movies} bind:details={selectedMovie} bind:filter={$searchInput} />
		</div>
	{/if}
</div>
