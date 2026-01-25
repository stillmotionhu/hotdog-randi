<script lang="ts">
	import type { Snippet } from 'svelte';

	interface PageTitleProps {
		children: Snippet;
	}

	let { children }: PageTitleProps = $props();
</script>

<h1 class="page-title">
	{@render children()}
</h1>

<style lang="scss">
	.page-title {
		font-family: Inter, Helvetica, sans-serif;
		font-size: 1.75rem;
		font-weight: 700;
		line-height: 2rem;
		color: rgb(var(--fg));
		margin-bottom: 1.5rem;
	}
</style>
