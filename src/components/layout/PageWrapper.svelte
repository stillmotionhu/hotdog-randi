<script lang="ts">
	import type { Snippet } from 'svelte';

	interface PageWrapperProps {
		children: Snippet;
	}

	let { children }: PageWrapperProps = $props();
</script>

<main class="page__wrapper">
	{@render children()}
</main>

<style lang="scss">
	@use '@/styles/breakpoint.scss' as *;

	.page__wrapper {
		width: var(--container-width);

		&:not(:has(.page-container--centered)) {
			padding: 150px 0 50px;

			@include breakpoint(lg) {
				padding: 35px 0 125px;
			}
		}
	}
</style>
