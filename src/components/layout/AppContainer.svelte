<script lang="ts">
	import { type Snippet } from 'svelte';

	interface AppContainerProps {
		children: Snippet;
	}

	let { children }: AppContainerProps = $props();
</script>

<div class="app__container">
	{@render children()}
</div>

<style lang="scss">
	.app__container {
		display: flex;
		justify-content: center;
	}
</style>
