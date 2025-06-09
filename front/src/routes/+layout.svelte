<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import '../app.css';
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	let { children } = $props();
	const searchInput = writable('');
	setContext('searchInput', searchInput);
</script>

<svelte:head>
	<title>Y a quoi au ciné ?</title>
	<meta
		name="description"
		content="Envie de voir rapidement ce qu'il y a au cinéma en ce moment ? Quel film aller voir ? Accéder rapidement au résumé et voir si c'est le genre de film qui te correspond ? Tu peux aussi accéder à la liste des prochaines sorties ciné et garder un oeil sur le boxoffice."
	/>

	<link rel="icon" type="image/x-icon" href="/favicon.ico" />
</svelte:head>

<div class="mx-auto mt-6 max-w-screen-2xl px-4">
	<a class="mb-6 flex flex-1 items-center justify-center lg:hidden" href="/">
		<h1 class="logo block lg:hidden">Y a quoi au ciné ?</h1>
	</a>
	<nav
		class="flex flex-1 items-center justify-center gap-4 bg-gray-800 p-2 lg:justify-between lg:p-4"
	>
		<div class="flex items-center gap-3 lg:gap-14">
			<h1 class="logo hidden lg:block">Y a quoi au ciné ?</h1>

			<div class="flex items-center gap-3 lg:gap-6">
				<a href="/">
					<img src="affiche_tab_img.webp" alt="Home tab" />
				</a>

				<a href="/radar">
					<img src="radar_img.webp" alt="Radar tab" />
				</a>
			</div>
		</div>

		<div class="relative hidden w-full max-w-xs lg:block">
			<input
				type="text"
				placeholder="Rechercher un film..."
				bind:value={$searchInput}
				class="w-full rounded-full border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-black placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>

			<span class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
				🔍
			</span>
		</div>
	</nav>

	<div class="block flex flex-row justify-center lg:hidden">
		<div class="relative mt-6 block w-full max-w-xs lg:hidden">
			<input
				type="text"
				placeholder="Rechercher un film..."
				bind:value={$searchInput}
				class="w-full rounded-full border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-black placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>

			<span class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
				🔍
			</span>
		</div>
	</div>

	{@render children()}

	<footer class="m-4 rounded-lg bg-white shadow-sm dark:bg-gray-900">
		<div class="mx-auto w-full max-w-screen-xl p-4 lg:py-8">
			<a
				href="/ia"
				class="block text-sm text-gray-500 hover:underline sm:text-center dark:text-gray-400">
				Utilisation de l'intelligence artificielle
			</a>
			<a
				href="/privacy-policy"
				class="block text-sm text-gray-500 hover:underline sm:text-center dark:text-gray-400">
				Règles de Confidentialité
			</a>
				<a
				href="/contact"
				class="block text-sm text-gray-500 hover:underline sm:text-center dark:text-gray-400">
				Nous contacter
			</a>
			<hr class="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
			<span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400"
				>© 2025 <a href="/" class="hover:underline">Y a quoi au ciné™</a>. Version 2.0.1. All
				Rights Reserved.</span
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
	}
</style>
