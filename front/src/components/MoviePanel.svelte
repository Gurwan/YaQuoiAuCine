<script lang="ts">
	let { selectedMovie = $bindable() } = $props();

	function closePanel() {
		selectedMovie = null;
	}
</script>

<div class="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm md:backdrop-blur-0 md:bg-transparent md:inset-auto md:fixed md:top-0 md:right-0 md:w-[50vw] md:h-screen">
	<div class="h-full overflow-y-auto shadow-xl rounded-none md:rounded-l-xl">
		<div class="relative bg-stone-200 h-56 md:h-72 bg-cover bg-center pb-2">
			<button
			  class="absolute top-4 right-4 text-black p-2"
			  onclick={closePanel}>
			  ✕
			</button>

			<div class="absolute bottom-0 left-4 right-4 pb-4 flex items-end space-x-4 transform translate-y-1/2">
			  <img
				src={'https://image.tmdb.org/t/p/w300' + selectedMovie.poster}
				alt={selectedMovie.title}
				class="w-24 md:w-36 rounded shadow-xl"
			  />
		  
			  <h2 class="text-2xl md:text-6xl font-semibold text-black">
				{selectedMovie.title}
			  </h2>
			</div>
		  </div>
		  
		<div class="p-6 pt-16 bg-white">

			<p class="text-sm mb-4">
				Sorti le {selectedMovie.release_date} — {selectedMovie.duration} min — ⭐ {selectedMovie.rating}
			</p>

			<p class="mb-6">{selectedMovie.overview}</p>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
				<div>
					<p><span class="font-semibold">Genres :</span> {selectedMovie.genres.join(', ')}</p>

					<p><span class="font-semibold">Pays :</span> {selectedMovie.countries.join(', ')}</p>

					<p><span class="font-semibold">Popularité :</span> {selectedMovie.popularity}</p>
				</div>

				<div>
					{#if selectedMovie.budget}
						<p><span class="font-semibold">Budget :</span> {selectedMovie.budget.toLocaleString()} $</p>
					{/if}

					{#if selectedMovie.revenue}
						<p><span class="font-semibold">Revenus :</span> {selectedMovie.revenue.toLocaleString()} $</p>
					{/if}

					{#if selectedMovie.revenue && selectedMovie.budget}
						{#if selectedMovie.budget * 2.5 < selectedMovie.revenue}
						RENTABLE
						{:else}
							PAS (ENCORE) RENTABLE
						{/if}
					{/if}
	
					<p><span class="font-semibold">Studios :</span> {selectedMovie.studios.map(s => s.name).join(', ')}</p>
				</div>
			</div>

			<div class="mt-6">
				<h3 class="font-semibold text-lg mb-2">Distribution</h3>
				
				<div class="flex overflow-x-auto gap-4">
					{#each selectedMovie.credits.cast.slice(0, 8) as actor}
						<div class="w-24 text-center flex-shrink-0">
							<img src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} alt={actor.name} class="rounded h-28 object-cover mx-auto" />
							
							<p class="text-xs mt-1 font-medium">{actor.name}</p>
							
							<p class="text-xs text-gray-500">{actor.character}</p>
						</div>
					{/each}
				</div>
			</div>
			
			<div class="mt-6">
				<h3 class="font-semibold text-lg mb-2">Équipe</h3>
				
				<div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
					{#each selectedMovie.credits.crew.slice(0, 6) as crew}
						<div>
							<p class="font-medium">{crew.name}</p>
							
							<p class="text-gray-500 text-xs">{crew.job}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>