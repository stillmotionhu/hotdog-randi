<script lang="ts">
	import type { Snippet } from 'svelte';

	interface CardContentProps {
		children: Snippet;
	}

	let { children }: CardContentProps = $props();
</script>

<main class="card__content">
	{@render children()}
</main>
