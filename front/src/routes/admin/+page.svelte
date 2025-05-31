<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { PUBLIC_TOKEN_BOXOFFICE } from '$env/static/public';
	import type { MovieJson } from '$lib/types/movie-json.js';

	const { data } = $props();
	const boxofficeData = Object.entries(data.data) as unknown as [string, MovieJson][];

	const state = $state({
		newKey: '',
		newValue: ''
	});
	let token = PUBLIC_TOKEN_BOXOFFICE;

	const refresh = async () => {
		await invalidate('/admin');
	};

	const addEntry = async () => {
		if (!state.newKey || !state.newValue) return;
		await fetch(`http://localhost:3000/admin/${state.newKey}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token
			},
			body: JSON.stringify({ value: state.newValue })
		});
		state.newKey = '';
		state.newValue = '';
		await refresh();
	};

	const updateVisibilityEntry = async (key: string, value: MovieJson) => {
		value.hidden = !value.hidden;
		await updateEntry(key, value);
	}

	const updateEntry = async (key: string, value: MovieJson) => {
		if (value) {
			await fetch(`http://localhost:3000/admin/${key}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token
				},
				body: JSON.stringify(value)
			});
			await refresh();
		}
	};

	const deleteEntry = async (key: string) => {
		await fetch(`http://localhost:3000/admin/${key}`, {
			method: 'DELETE',
			headers: {
				Authorization: token
			}
		});
		await refresh();
	};
</script>

<table>
	<thead>
		<tr>
			<th>Film ID</th>
			<th>Nombre entrées</th>
			<th>Actions</th>
		</tr>
	</thead>
	<tbody>
		{#each boxofficeData as [key, value], i}
			<tr>
				<td>{key}</td>

				<td>
					<input
						type="number"
						bind:value={value.boxoffice}
						onchange={() => updateEntry(key, value)}
					/>
				</td>
				<td>
					<button onclick={() => deleteEntry(key)}><i class="fa-solid fa-trash"></i></button>
					<button onclick={() => updateVisibilityEntry(key, value)}>
						{#if value.hidden}
							<i class="fa-solid fa-eye"></i>
						{:else}
							<i class="fa-solid fa-eye-slash"></i>
						{/if}
					</button>
					<button onclick={() => upMovie(key)}><i class="fa-solid fa-plus"></i></button>
					<button onclick={() => downMovie(key)}><i class="fa-solid fa-minus"></i></button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<h2>Ajouter une entrée</h2>
<input placeholder="Clé" bind:value={state.newKey} />
<input placeholder="Valeur" bind:value={state.newValue} />
<button onclick={addEntry}>Ajouter</button>
