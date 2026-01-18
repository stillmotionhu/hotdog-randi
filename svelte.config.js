import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess({ script: true }),
	prerender: true,
	compilerOptions: {
		warningFilter: (warning) => {
			if (
				warning.code === 'a11y_no_noninteractive_element_to_interactive_role' ||
				warning.code === 'a11y_positive_tabindex'
			) {
				return false;
			}

			return true;
		}
	},
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			precompress: false,
			strict: true
		}),
		alias: {
			'@/*': 'src/*'
		}
	}
};

export default config;
