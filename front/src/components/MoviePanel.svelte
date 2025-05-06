<script lang="ts">
	import { PopularityCategory } from '$lib/types/popularity';

	let { selectedMovie = $bindable() } = $props();

	function closePanel() {
		selectedMovie = null;
	}

	function getPopularityCategory(popularity: number | undefined): PopularityCategory {
		if (popularity === undefined) {
			return PopularityCategory.INCONNU_BATAILLON;
		} else if (popularity >= 400) {
			return PopularityCategory.HYPE_TOTALE;
		} else if (popularity >= 200) {
			return PopularityCategory.GROS_BUZZ;
		} else if (popularity >= 50) {
			return PopularityCategory.FAIT_PARLER;
		} else if (popularity >= 10) {
			return PopularityCategory.VU_PAR_LES_CINEPHILES;
		} else if (popularity >= 4) {
			return PopularityCategory.PLANQUE;
		}

		return PopularityCategory.INCONNU_BATAILLON;
	}
</script>

<div
	class="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm md:fixed md:inset-auto md:right-0 md:top-0 md:h-screen md:w-[50vw] md:bg-transparent md:backdrop-blur-0"
>
	<div class="h-full overflow-y-auto rounded-none shadow-xl md:rounded-l-xl">
		<div class="relative h-56 overflow-hidden bg-stone-200 pb-8 md:h-72">
			<img
				src={'https://image.tmdb.org/t/p/original' + selectedMovie.background}
				alt={selectedMovie.title}
				class="absolute inset-0 h-full w-full object-cover font-mono subpixel-antialiased"
			/>

			<button
				class="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-2xl text-white"
				onclick={closePanel}>✕</button
			>

			<div class="absolute bottom-4 left-4 right-4">
				<h2 class="text-2xl font-semibold text-white drop-shadow-lg md:text-6xl">
					{selectedMovie.title}
				</h2>
			</div>
		</div>

		<div class="bg-white p-6 pt-4">
			<p class="mb-4 text-sm">
				Sorti le {selectedMovie.release_date} — {selectedMovie.duration} — ⭐ {selectedMovie.rating}
				/ 10
			</p>

			<p class="mb-6">{selectedMovie.overview}</p>

			<div class="grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
				<div>
					<p><span class="font-semibold">Genres :</span> {selectedMovie.genres.join(', ')}</p>

					<p><span class="font-semibold">Pays :</span> {selectedMovie.countries.join(', ')}</p>

					<p>
						<span class="font-semibold">Popularité :</span>
						{getPopularityCategory(selectedMovie.popularity)}
					</p>
				</div>

				<div>
					{#if selectedMovie.budget}
						<p>
							<span class="font-semibold">Budget :</span>
							{selectedMovie.budget.toLocaleString()} $
						</p>
					{/if}

					{#if selectedMovie.revenue}
						<p>
							<span class="font-semibold">Revenus :</span>
							{selectedMovie.revenue.toLocaleString()} $
						</p>
					{/if}

					{#if selectedMovie.revenue && selectedMovie.budget}
						{#if selectedMovie.budget * 2.5 < selectedMovie.revenue}
							<p class="w-max rounded bg-green-500 px-3 py-1 text-white">Rentable</p>
						{:else}
							<p class="w-max rounded bg-red-500 px-3 py-1 text-white">Pas (encore) rentable</p>
						{/if}
					{/if}

					<p>
						<span class="font-semibold">Studios :</span>
						{selectedMovie.studios
							.map((s: { name: string; origin_country: string }) => s.name)
							.join(', ')}
					</p>
				</div>
			</div>

			<div class="mt-6">
				<h3 class="mb-2 text-lg font-semibold">Distribution</h3>

				<div class="hide-scrollbar flex gap-4 overflow-x-auto">
					<div class="flex space-x-6 pb-4">
						{#each selectedMovie.credits.cast as actor (actor.name)}
							<div class="relative w-28 group flex-shrink-0 text-center">
								<div
									class="aspect-square transform overflow-hidden rounded-full border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-105"
								>
									<img
										src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
										alt={actor.name}
										class="h-full w-full object-cover"
									/>
								</div>

								<p class="mt-1 text-xs font-medium">{actor.name}</p>

								<p class="text-xs text-gray-500">{actor.character}</p>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<div class="mt-6">
				<h3 class="mb-2 text-lg font-semibold">Équipe</h3>

				<div class="grid grid-cols-2 gap-4 text-sm text-gray-600 md:grid-cols-3">
					{#each selectedMovie.credits.crew.slice(0, 6) as crew}
						<div>
							<p class="font-medium">{crew.name}</p>

							<p class="text-xs text-gray-500">{crew.job}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
