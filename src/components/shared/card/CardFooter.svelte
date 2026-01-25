<script lang="ts">
	import type { Snippet } from 'svelte';

	interface CardFooterProps {
		children: Snippet;
	}

	let { children }: CardFooterProps = $props();
</script>

<footer class="card__footer">
	{@render children()}
</footer>

<style lang="scss">
	.card__footer {
		display: flex;
		justify-content: flex-end;
		font-size: 0.875rem;

		:global(a) {
			color: color-mix(in srgb, rgb(var(--primary-color)), black 5%);
			text-decoration: none;

			&:hover {
				text-decoration: underline;
			}
		}
	}
</style>
