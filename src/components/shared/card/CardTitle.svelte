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
