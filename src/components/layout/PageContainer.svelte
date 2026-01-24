<script lang="ts">
	import type { Snippet } from 'svelte';

	interface PageContainerProps {
		children: Snippet;
		isCentered?: boolean;
	}

	let { children, isCentered = false }: PageContainerProps = $props();
</script>

<div class={['page-container', isCentered && 'page-container--centered']}>
	{@render children()}
</div>

<style lang="scss">
	.page-container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;

		&--centered {
			justify-content: center;
		}
	}
</style>
