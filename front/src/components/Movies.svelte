<script>
	import MovieCard from './MovieCard.svelte';
	let data = $props();
    let movies = data.movies;
</script>

{#if movies?.length > 0}
	<div class="mt-3 grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
		{#each movies as movie}
			<MovieCard {movie} />
		{/each}
	</div>
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