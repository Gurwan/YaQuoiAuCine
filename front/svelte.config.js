//import adapter from '@sveltejs/adapter-static'; //android
import adapter from '@sveltejs/adapter-netlify';

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	compilerOptions: {
		runes: true
	},
	preprocess: vitePreprocess(),
	kit: {
		/* adapter: adapter({
			pages: 'dist',
			assets: 'dist',
			fallback: 'index.html' 
		}) */ //android
		adapter: adapter()
	}
};

export default config;
