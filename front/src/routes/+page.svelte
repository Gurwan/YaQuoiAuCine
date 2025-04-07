<script lang="ts">
	let data = $props();
	let movies = data.data.movies;
</script>

<div class="mx-auto mt-6 max-w-screen-2xl px-4">
	<nav class="bg-gray-800 p-4">
		<h1 class="logo">Y a quoi au ciné ?</h1>
	</nav>

	{#if movies?.length == 0}
		<ul class="mt-3 space-y-4">
			{#each movies as movie}
				<li class="rounded bg-gray-100 p-4 shadow">
					<h2 class="text-lg font-semibold">{movie.title}</h2>
					{#if movie.poster_path}
						<img
							src={'https://image.tmdb.org/t/p/w300' + movie.poster_path}
							alt={movie.title}
							class="mt-2 rounded"
						/>
					{/if}
				</li>
			{/each}
		</ul>
	{:else}
		<div class="mt-10 mb-20 flex items-center justify-center">
			<img
				src="loading.gif"
				alt="Chargement..."
				class="loading-gif"
			/>
		</div>
	{/if}

	<footer class="bg-white rounded-lg shadow-sm dark:bg-gray-900 m-4">
		<div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
			<hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
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

	.loading-gif {
		height: 15.625rem;
		width: 10.41rem;
	}
</style>
