<script lang="ts">
	import type { Movie } from '$lib/types/movie';
	import { getContext } from 'svelte';
	import MoviePanel from '../components/MoviePanel.svelte';
	import Movies from '../components/Movies.svelte';
	import { type Writable } from 'svelte/store';

	let data = $props();
	const moviesData = $state<Movie[]>(data.data.movies);

	const movies = $derived.by(() => {
		const seenTitles = new Set<string>();

		return [...moviesData]
			.sort((a, b) => (a.json?.position ?? 50) - (b.json?.position ?? 50))
			.filter((m) => {
				if (seenTitles.has(m.title)) {
					return false;
				}
				seenTitles.add(m.title);
				return true;
			});
	});

	const searchInput = getContext<Writable<string>>('searchInput');

	let selectedMovie = $state();
</script>

<div class="relative mt-6 flex flex-col gap-4 md:flex-row">
	{#if selectedMovie}
		<MoviePanel bind:selectedMovie />
	{:else}
		<div class="w-full">
			<Movies {movies} bind:details={selectedMovie} bind:filter={$searchInput} />
		</div>
	{/if}
</div>
