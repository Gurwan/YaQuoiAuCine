<script lang="ts">
	import { PUBLIC_TOKEN_BOXOFFICE, PUBLIC_API_URL } from '$env/static/public';
	import type { MovieJson } from '$lib/types/movie-json.js';
	import { get, writable } from 'svelte/store';

	const { data } = $props();
	const boxofficeData = writable<[string, MovieJson][]>(Object.entries(data.data));

	const state = $state({
		newKey: '',
		newValue: '',
		hideMoviesHidden: false
	});

	let token = PUBLIC_TOKEN_BOXOFFICE;

	const addEntry = async () => {
		if (!state.newKey || !state.newValue) return;
		await fetch(`${PUBLIC_API_URL}/admin/${state.newKey}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token
			},
			body: JSON.stringify({ value: state.newValue })
		});

		boxofficeData.update((entries) => [
			...entries,
			[state.newKey, { boxoffice: Number(state.newValue), position: 0, hidden: false }]
		]);
		state.newKey = '';
		state.newValue = '';
	};

	const updateVisibilityEntry = async (key: string, value: MovieJson) => {
		value.hidden = !value.hidden;
		await updateEntry(key, value);
	};

	const changeVisibilityHidden = () => {
		state.hideMoviesHidden = !state.hideMoviesHidden;
	};

	const updateEntry = async (key: string, value: MovieJson) => {
		if (value) {
			await fetch(`${PUBLIC_API_URL}/admin/${key}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token
				},
				body: JSON.stringify(value)
			});

			boxofficeData.update((entries) =>
				entries.map(([k, v]) => (k === key ? [k, { ...value }] : [k, v]))
			);
		}
	};

	const sortEntries = async () => {
		let entries = get(boxofficeData);

		const sorted = entries
			.slice()
			.sort((a, b) => (a[1].position ?? 0) - (b[1].position ?? 0))
			.map(([key, value], i) => {
				value.position = i;
				updateEntry(key, value);
				return [key, { ...value }];
			});

		boxofficeData.set(sorted as [string, MovieJson][]);
	};

	const deleteEntry = async (key: string) => {
		await fetch(`${PUBLIC_API_URL}/admin/${key}`, {
			method: 'DELETE',
			headers: {
				Authorization: token
			}
		});

		boxofficeData.update((entries) => entries.filter(([k]) => k !== key));
	};
</script>

<div class="relative mt-6 overflow-x-auto">
	<div class="flex flex-col bg-white p-5">
		<h2>Actions générales</h2>

		<button class="font-semibold" onclick={() => sortEntries()}
			>Trier par position <i class="fa-solid fa-sort"></i></button
		>
		<button class="font-semibold" onclick={() => changeVisibilityHidden()}>
			{#if state.hideMoviesHidden}
				Afficher les films masqués <i class="fa-solid fa-eye"></i>
			{:else}
				Masquer les films masqués <i class="fa-solid fa-eye-slash"></i>
			{/if}</button
		>
	</div>

	<table class="mt-6 w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
		<thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
			<tr>
				<th scope="col" class="px-6 py-3">Film ID</th>
				<th scope="col" class="px-6 py-3">Nombre entrées</th>
				<th scope="col" class="px-6 py-3">Position</th>
				<th scope="col" class="px-6 py-3">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each $boxofficeData as [key, value]}
				{#if !value.hidden || (value.hidden && !state.hideMoviesHidden)}
					<tr class="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
						<td class="px-6 py-4">{key}</td>

						<td class="px-6 py-4">
							<input
								type="number"
								bind:value={value.boxoffice}
								onchange={() => updateEntry(key, value)}
							/>
						</td>

						<td class="px-6 py-4"
							><input
								type="number"
								bind:value={value.position}
								onchange={() => updateEntry(key, value)}
							/></td
						>

						<td class="px-6 py-4">
							<button onclick={() => deleteEntry(key)}><i class="fa-solid fa-trash"></i></button>
							<button onclick={() => updateVisibilityEntry(key, value)}>
								{#if value.hidden}
									<i class="fa-solid fa-eye"></i>
								{:else}
									<i class="fa-solid fa-eye-slash"></i>
								{/if}
							</button>
						</td>
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
</div>
