<script lang="ts">
	import type { Movie } from '$lib/types/movie';
	import MoviePanel from '../components/MoviePanel.svelte';
	import Movies from '../components/Movies.svelte';

	let data = $props();
	let movies: Movie[] = data.data.movies;
	let searchInput = $state('');

	let selectedMovie = $state();
</script>

<div class="mx-auto mt-6 max-w-screen-2xl px-4">
	<nav class="flex flex-1 items-center justify-between bg-gray-800 p-2 md:p-4">
		<div class="flex gap-3 md:gap-14 items-center">
			<h1 class="logo">Y a quoi au ciné ?</h1>

			<div class="flex gap-3 md:gap-6 items-center">
				<a href="/">
					<img src="affiche_tab_img.webp" alt="Home tab" />
				</a>

				<a href="/radar">
					<img src="radar_img.webp" alt="Radar tab" />
				</a>
			</div>
		</div>

		<div class="relative w-full max-w-xs hidden md:block">
			<input
				type="text"
				placeholder="Rechercher un film..."
				bind:value={searchInput}
				class="w-full rounded-full border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-black placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>

			<span class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
				🔍
			</span>
		</div>
	</nav>

	<div class="relative mt-6 flex flex-col gap-4 md:flex-row">
		{#if selectedMovie}
			<div class="w-full md:w-1/2">
				<Movies {movies} bind:details={selectedMovie} bind:filter={searchInput} />
			</div>

			<MoviePanel bind:selectedMovie />
		{:else}
			<div class="w-full">
				<Movies {movies} bind:details={selectedMovie} bind:filter={searchInput}/>
			</div>
		{/if}
	</div>

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
</style>
