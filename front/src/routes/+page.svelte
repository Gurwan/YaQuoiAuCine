<script lang="ts">
	import type { Movie } from '$lib/types/movie';
	import Movies from '../components/Movies.svelte';

	let data = $props();
	let movies: Movie[] = data.data.movies;
</script>

<div class="mx-auto mt-6 max-w-screen-2xl px-4">
	<nav class="bg-gray-800 p-4">
		<h1 class="logo">Y a quoi au ciné ?</h1>
	</nav>

	<Movies {movies} />

	<footer class="m-4 rounded-lg bg-white shadow-sm dark:bg-gray-900">
		<div class="mx-auto w-full max-w-screen-xl p-4 md:py-8">
			<hr class="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
			<span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="/" class="hover:underline">Y a quoi au ciné™</a>. All Rights Reserved.</span>
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
