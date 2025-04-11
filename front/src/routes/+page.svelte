<script lang="ts">
	import type { Movie } from '$lib/types/movie';
	let data = $props();
	let movies: Movie[] = data.data.movies;

	async function openMovie(movie: Movie) {
		try {
			const response = await fetch(`http://localhost:3000/movie/${movie.id}`);
			if (!response.ok) throw new Error('Erreur de chargement');

			const selectedMovie = await response.json();
			console.log('Détails du film :', selectedMovie);
		} catch (error) {
			console.error('Erreur lors de l\'appel API à movie :', error);
		}
	}
</script>

<div class="mx-auto mt-6 max-w-screen-2xl px-4">
	<nav class="bg-gray-800 p-4">
		<h1 class="logo">Y a quoi au ciné ?</h1>
	</nav>

	{#if movies?.length > 0}
		<div class="mt-3 grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
			{#each movies as movie}
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

						<div
							class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100"
						>
							★ {movie.rating.toFixed(1)} / 10
						</div>
					</div>
					<h2 class="mt-2 truncate text-center text-sm font-medium text-gray-800 sm:text-base">
						{movie.title}
					</h2>
				</button>
			{/each}
		</div>
	{:else}
		<div class="mb-20 mt-10 flex items-center justify-center">
			<img src="loading.gif" alt="Chargement..." class="loading-gif" />
		</div>
	{/if}

	<footer class="m-4 rounded-lg bg-white shadow-sm dark:bg-gray-900">
		<div class="mx-auto w-full max-w-screen-xl p-4 md:py-8">
			<hr class="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
			<span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400"
				>© 2025 <a href="/" class="hover:underline">Y a quoi au ciné™</a>. All Rights Reserved.</span
			>
		</div>
	</footer>
</div>

<style>
	.logo {
		background: url('/logo_texte.webp') no-repeat center;
		background-size: contain;
		width: 230px;
		height: 85px;
		text-indent: -9999px;
		display: block;
	}

	.loading-gif {
		height: 15.625rem;
		width: 10.41rem;
	}
</style>
