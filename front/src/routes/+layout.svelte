<script lang="ts">
	import '../app.css';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	let { children } = $props();
	const searchInput = writable('');
	setContext('searchInput', searchInput);
</script>

<svelte:head>
	<script src="https://formspree.io/js/formbutton-v1.min.js" defer></script>
	<script>
	  window.formbutton=window.formbutton||function(){(formbutton.q=formbutton.q||[]).push(arguments)};
	  formbutton("create", {
	    action: "https://formspree.io/f/xbloeobg",
	    title: "Besoin d'aide ?",
	    fields: [
	      { 
	        type: "email", 
	        label: "Email :", 
	        name: "email",
	        required: true,
	        placeholder: "tonadressemail@gmail.com"
	      },
	      {
	        type: "textarea",
	        label: "Message :",
	        name: "message",
	        placeholder: "Qu'est que vous voulez nous transmettre ?",
	      },
	      { type: "submit" }      
	    ],
	    styles: {
	      title: {
	        backgroundColor: "orange"
	      },
	      button: {
	        backgroundColor: "orange"
	      }
	    }
	  });
	</script>
</svelte:head>

<div class="mx-auto mt-6 max-w-screen-2xl px-4">
	<nav class="flex flex-1 items-center justify-between bg-gray-800 p-2 md:p-4">
		<div class="flex items-center gap-3 md:gap-14">
			<h1 class="logo">Y a quoi au ciné ?</h1>

			<div class="flex items-center gap-3 md:gap-6">
				<a href="/">
					<img src="affiche_tab_img.webp" alt="Home tab" />
				</a>

				<a href="/radar">
					<img src="radar_img.webp" alt="Radar tab" />
				</a>
			</div>
		</div>

		<div class="relative hidden w-full max-w-xs md:block">
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

	{@render children()}

	<footer class="m-4 rounded-lg bg-white shadow-sm dark:bg-gray-900">
		<div class="mx-auto w-full max-w-screen-xl p-4 md:py-8">
			<hr class="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
			<span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400"
				>© 2025 <a href="/" class="hover:underline">Y a quoi au ciné™</a>. All Rights Reserved.</span
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
		display: block;
	}
</style>
