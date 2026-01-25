<script lang="ts">
	import type { Snippet } from 'svelte';

	interface CardTitleProps {
		children: Snippet;
	}

	let { children }: CardTitleProps = $props();
</script>

<h1 class="card__title">
	{@render children()}
</h1>

<style lang="scss">
	.card__title {
		font-family: Inter, Helvetica, sans-serif;
		font-size: 2rem;
		font-weight: 700;
		line-height: 2rem;
		color: rgb(var(--fg));
	}
</style>
