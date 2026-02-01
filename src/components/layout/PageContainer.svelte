<script lang="ts">
	import type { Snippet } from 'svelte';

	interface PageContainerProps {
		id?: string;
		isCentered?: boolean;
		children: Snippet;
	}

	let { children, id, isCentered = false }: PageContainerProps = $props();
</script>

<div class={['page__container', isCentered && 'page__container--centered']} {id}>
	{@render children()}
</div>

<style lang="scss">
	.page__container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;

		&--centered {
			justify-content: center;
		}
	}
</style>
