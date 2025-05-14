<script lang="ts">
	import MovieCard from './MovieCard.svelte';
	import type { Movie } from '$lib/types/movie';

	let {
		details = $bindable(),
		movies,
		filter = $bindable()
	}: { details: any; movies: Movie[]; filter: String } = $props();

	let filteredMovies = $derived.by(() => {
		return filter === ''
			? movies
			: movies.filter((movie: Movie) => movie.title.toLowerCase().includes(filter.toLowerCase()));
	});
</script>

{#if filteredMovies?.length > 0}
	{#if details}
		<div class="mt-3 grid grid-cols-2 gap-4 p-4">
			{#each filteredMovies as movie}
				<MovieCard {movie} bind:details />
			{/each}
		</div>
	{:else}
		<div class="mt-3 grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
			{#each filteredMovies as movie}
				<MovieCard {movie} bind:details />
			{/each}
		</div>
	{/if}
{:else}
	<div class="mb-20 mt-10 flex items-center justify-center">
		<img src="loading.gif" alt="Chargement..." class="loading-gif" />
	</div>
{/if}

<style>
	.loading-gif {
		height: 15.625rem;
		width: 10.41rem;
	}
</style>
