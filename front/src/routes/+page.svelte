<script lang="ts">
	let data = $props();
	let movies = data.data.movies;
</script>

<div class="mx-auto mt-6 max-w-screen-2xl px-4">
	<nav class="bg-gray-800 p-4">
		<h1 class="logo">Y a quoi au ciné ?</h1>
	</nav>

	{#if movies?.length > 0}
		<ul class="space-y-4 mt-3">
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
		<p>Chargement ou aucun film trouvé.</p>
	{/if}
</div>

<img
	src="/home_no_bg.webp"
	alt=""
	class="absolute bottom-0 left-0 w-auto max-w-xs md:max-w-sm lg:max-w-md"
/>

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
