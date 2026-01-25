<script lang="ts">
	import type { Snippet } from 'svelte';

	interface CardHeaderProps {
		children: Snippet;
	}

	let { children }: CardHeaderProps = $props();
</script>

<header class="card__header">
	{@render children()}
</header>
