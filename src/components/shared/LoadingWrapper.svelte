<script lang="ts">
	import type { Snippet } from 'svelte';

	interface LoadingWrapperProps {
		children: Snippet;
	}

	let { children }: LoadingWrapperProps = $props();
</script>

<div class="loading__wrapper">
	{@render children()}
</div>

<style lang="scss">
	.loading__wrapper {
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;
		z-index: 999;
		pointer-events: none;
	}
</style>
