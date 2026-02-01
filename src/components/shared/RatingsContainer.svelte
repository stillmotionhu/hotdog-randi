<script lang="ts">
	import type { Snippet } from 'svelte';

	interface RatingsContainerProps {
		children: Snippet;
	}

	let { children }: RatingsContainerProps = $props();
</script>

<div class="ratings__container">
	{@render children()}
</div>

<style lang="scss">
	@use '@/styles/breakpoint.scss' as *;

	.ratings__container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 35px;

		@include breakpoint(lg) {
			display: flex;
			flex-direction: column;
		}
	}
</style>
