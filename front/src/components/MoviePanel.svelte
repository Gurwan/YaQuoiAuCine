<script lang="ts">
	import { PopularityCategory } from '$lib/types/popularity';
	import { swipeToClose } from '$lib/utils/closePanelSwipe';

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
	class="fixed inset-0 z-50 backdrop-blur-sm md:static md:w-[50vw] md:bg-transparent md:backdrop-blur-0"
	use:swipeToClose={closePanel}
>
	<div
		class="border-5 h-full overflow-y-auto rounded-none border-black shadow-xl md:h-auto md:rounded-xl"
	>
		<div class="relative h-56 overflow-hidden pb-8 md:h-72">
			{#if selectedMovie.background}
				<img
					src={'https://image.tmdb.org/t/p/original' + selectedMovie.background}
					alt={selectedMovie.title}
					class="absolute inset-0 h-full w-full object-cover font-mono subpixel-antialiased"
				/>
			{/if}

			<button
				class="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-2xl text-white"
				onclick={closePanel}>✕</button
			>

			<div class="absolute bottom-4 left-4">
				<h2
					class="inline-block bg-black bg-opacity-60 px-4 py-2 text-2xl font-semibold text-white antialiased drop-shadow-lg md:text-6xl"
				>
					{selectedMovie.title}
				</h2>
			</div>
		</div>

		<div class="bg-[url('/background_panel.webp')] bg-repeat p-6 pt-4">
			<div class="rounded-xl border-4 border-black bg-white p-3">
				<p class="mb-4 text-base">
					Sorti le {selectedMovie.release_date} — {selectedMovie.duration}
					{#if selectedMovie.rating > 0}
						— ⭐ {selectedMovie.rating}
						/ 10
					{/if}
				</p>

				<p class="mb-6 text-lg">{selectedMovie.overview}</p>

				<div class="grid grid-cols-1 gap-6 text-base md:grid-cols-2">
					<div>
						<p>
							<span class="text-lg font-semibold">Genres :</span>
							{selectedMovie.genres.join(', ')}
						</p>

						<p>
							<span class="text-lg font-semibold">Pays :</span>
							{selectedMovie.countries.join(', ')}
						</p>

						<p>
							<span class="text-lg font-semibold">Popularité :</span>
							{getPopularityCategory(selectedMovie.popularity)}
						</p>

						{#if selectedMovie.revenue && selectedMovie.budget}
							{#if selectedMovie.budget * 2.5 < selectedMovie.revenue}
								<p class="w-max rounded bg-green-500 px-3 py-1 text-lg text-white">Rentable</p>
							{:else}
								<p class="w-max rounded bg-red-500 px-3 py-1 text-lg text-white">
									Pas (encore) rentable
								</p>
							{/if}
						{/if}
					</div>

					<div>
						{#if selectedMovie.budget}
							<p>
								<span class="text-lg font-semibold">Budget :</span>
								{selectedMovie.budget.toLocaleString()} $
							</p>
						{/if}

						{#if selectedMovie.revenue}
							<p>
								<span class="text-lg font-semibold">Revenus :</span>
								{selectedMovie.revenue.toLocaleString()} $
							</p>
						{/if}

						{#if selectedMovie.json?.boxoffice}
							<p>
								<span class="text-lg font-semibold">Entrées en France :</span>
								{selectedMovie.json?.boxoffice.toLocaleString('fr-FR')}
							</p>
						{/if}

						{#if selectedMovie.json?.trailer}
							<a
								rel="external"
								target="_blank"
								href={selectedMovie.json?.trailer}
								class="btn flex flex-row gap-3"
							>
								<i class="fa-brands fa-youtube mt-1"></i>
								<span>Voir la bande d'annonce</span>
							</a>
						{/if}

						{#if selectedMovie.json?.tiktok}
							<a
								rel="external"
								target="_blank"
								href={selectedMovie.json?.tiktok}
								class="btn flex flex-row gap-3"
							>
								<i class="fa-brands fa-tiktok mt-1"></i>
								<span>Voir notre tiktok sur le film</span>
							</a>
						{/if}
					</div>
				</div>

				<p class="text-base">
					<span class="text-lg font-semibold">Studios :</span>
					{selectedMovie.studios
						.map((s: { name: string; origin_country: string }) => s.name)
						.join(', ')}
				</p>
			</div>

			<div
				class="border-6 mt-3 border-solid border-black bg-[url('/background_actor.webp')] bg-top bg-repeat"
			>
				<h3 class="mb-2 bg-black p-2 text-center text-xl font-semibold text-white">Distribution</h3>

				<div class="flex gap-4 overflow-x-auto">
					<div class="flex space-x-6 p-3">
						{#each selectedMovie.credits.cast as actor, index (actor.name + '|' + index)}
							<div
								class="group relative flex w-28 flex-shrink-0 flex-col items-center justify-center text-center"
							>
								<div
									class="aspect-square transform overflow-hidden rounded-full border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-105"
								>
									{#if actor.profile_path}
										<img
											src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
											alt={actor.name}
											class="h-full w-full object-cover"
										/>
									{:else}
										<img
											src={'empty_actor.webp'}
											alt={actor.name}
											class="h-full w-full object-cover"
										/>
									{/if}
								</div>

								<div class="mt-4 bg-black p-2">
									<p class="mt-1 text-sm font-medium text-white">{actor.name}</p>

									<p class="text-sm text-white">{actor.character}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<div
				class="border-6 mt-1 border-solid border-black bg-[url('/background_crew.webp')] bg-top bg-repeat"
			>
				<h3 class="mb-2 bg-black p-2 text-center text-xl font-semibold text-white">Équipe</h3>

				<div class="flex gap-4 overflow-x-auto">
					<div class="flex space-x-6 p-3">
						{#each selectedMovie.credits.crew as crew, index (crew.name + ' | ' + crew.job + ' | ' + index)}
							<div
								class="group relative flex w-28 flex-shrink-0 flex-col items-center justify-center text-center"
							>
								<div
									class="aspect-square transform overflow-hidden rounded-full border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-105"
								>
									{#if crew.profile_path}
										<img
											src={`https://image.tmdb.org/t/p/w185${crew.profile_path}`}
											alt={crew.name}
											class="h-full w-full object-cover"
										/>
									{:else}
										<img
											src={'empty_crew.webp'}
											alt={crew.name}
											class="h-full w-full object-cover"
										/>
									{/if}
								</div>

								<div class="mt-4 bg-black p-2">
									<p class="mt-1 text-sm font-medium text-white">{crew.name}</p>

									<p class="text-sm text-white">{crew.job}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
