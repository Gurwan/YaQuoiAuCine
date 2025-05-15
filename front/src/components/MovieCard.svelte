<script lang="ts">
	import type { Movie } from '$lib/types/movie';

	let { details = $bindable(), movie } = $props();

	async function openMovie(movie: Movie) {
		try {
			const response = await fetch(`http://localhost:3000/movie/${movie.id}`);
			if (!response.ok) throw new Error('Erreur de chargement');

			details = await response.json();
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} catch (error) {
			console.error("Erreur lors de l'appel API à movie :", error);
		}
	}
</script>

<button
	class="group transform cursor-pointer transition hover:scale-105"
	onclick={() => openMovie(movie)}
>
	<div class="relative">
		{#if movie.poster}
			<img
				src={'https://image.tmdb.org/t/p/w300' + movie.poster}
				alt={movie.title}
				class="h-auto w-full rounded object-cover shadow-lg"
			/>
		{:else}
			<img
				src="default_poster.webp"
				alt={movie.title}
				class="h-auto w-full rounded object-cover shadow-lg"
			/>
		{/if}
		
		{#if movie.rating > 0}
			<div
				class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100"
			>
				★ {movie.rating.toFixed(1)} / 10
			</div>
		{/if}
	</div>
	<h2 class="mt-2 truncate text-center text-sm font-medium text-gray-800 sm:text-base">
		{movie.title}
	</h2>
</button>

<style>
	button {
		color: white;
		padding: 0.5em 1em;
		border-radius: 4px;
		border: none;
	}
</style>
