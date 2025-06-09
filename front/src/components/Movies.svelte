<script lang="ts">
	import MovieCard from './MovieCard.svelte';
	import type { Movie } from '$lib/types/movie';

	let {
		details = $bindable(),
		movies,
		filter = $bindable()
	}: { details: any; movies: Movie[]; filter: String } = $props();

	let activeGenres: string[] = $state([]);
	let disableGenres: string[] = $state([]);

	let filteredMovies = $derived.by(() => {
		return movies.filter((movie: Movie) => {
			const titleMatches =
				filter === '' || movie.title.toLowerCase().includes(filter.toLowerCase());
			const movieGenres = movie.genres;

			if (activeGenres.length === 0) {
				const hasDisabled = movieGenres.some((genre) => disableGenres.includes(genre));
				return titleMatches && !hasDisabled;
			}

			const hasActive = movieGenres.some((genre) => activeGenres.includes(genre));
			const hasDisabled = movieGenres.some((genre) => disableGenres.includes(genre));

			return titleMatches && hasActive && !hasDisabled;
		});
	});

	let genres = $derived.by(() => {
		return new Set(movies.flatMap((movie) => movie.genres).sort());
	});

	function changeStatusGenre(genre: string): void {
		if (activeGenres.includes(genre)) {
			activeGenres.splice(activeGenres.indexOf(genre, 0), 1);
			disableGenres.push(genre);
		} else if (disableGenres.includes(genre)) {
			disableGenres.splice(disableGenres.indexOf(genre, 0), 1);
		} else {
			activeGenres.push(genre);
		}
	}
</script>

<ul class="flex flex-nowrap gap-1 overflow-x-auto md:flex-wrap md:gap-3">
	{#each Array.from(genres) as genre}
		<li>
			<button
				onclick={() => changeStatusGenre(genre)}
				type="button"
				class:selected={activeGenres.includes(genre)}
				class:disabled={disableGenres.includes(genre)}
				class="mb-2 me-2 flex gap-2 text-nowrap rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
			>
				{#if activeGenres.includes(genre)}
					<i class="fa-solid fa-xmark mt-1"></i>
				{:else if disableGenres.includes(genre)}
					<i class="fa-solid fa-plus mt-1"></i>
				{/if}
				{genre}
			</button>
		</li>
	{/each}
</ul>

{#if filteredMovies?.length > 0}
	{#if details}
		<div class="mt-3 grid grid-cols-2 gap-4 p-4">
			{#each filteredMovies as movie}
				<MovieCard {movie} bind:details />
			{/each}
		</div>
	{:else}
		<div
			class="mt-3 grid grid-cols-2 gap-4 p-0 sm:grid-cols-3 md:grid-cols-4 md:p-4 lg:grid-cols-5"
		>
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
