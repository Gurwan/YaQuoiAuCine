<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { PUBLIC_TOKEN_BOXOFFICE } from '$env/static/public';

	const { data } = $props();
	const boxofficeData = Object.entries(data.data) as [string, string][];

	const state = $state({
		newKey: '',
		newValue: ''
	});
	let token = PUBLIC_TOKEN_BOXOFFICE;

	const refresh = async () => {
		await invalidate('/boxoffice');
	};

	const addEntry = async () => {
		if (!state.newKey || !state.newValue) return;
		await fetch(`http://localhost:3000/boxoffice/${state.newKey}`, {
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

	const updateEntry = async (key: string, value: string) => {
		await fetch(`http://localhost:3000/boxoffice/${key}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token
			},
			body: JSON.stringify({ value })
		});
		await refresh();
	};

	const deleteEntry = async (key: string) => {
		await fetch(`http://localhost:3000/boxoffice/${key}`, {
			method: 'DELETE',
			headers: {
				Authorization: token
			}
		});
		await refresh();
	};
</script>

<h1>Box Office</h1>

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
						type="text"
						bind:value={boxofficeData[i][1]}
						onchange={() => updateEntry(key, boxofficeData[i][1])}
					/>
				</td>
				<td>
					<button onclick={() => deleteEntry(key)}>Supprimer</button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<h2>Ajouter une entrée</h2>
<input placeholder="Clé" bind:value={state.newKey} />
<input placeholder="Valeur" bind:value={state.newValue} />
<button onclick={addEntry}>Ajouter</button>
