<script lang="ts">
	import type { Snippet } from 'svelte';

	interface CardProps {
		children: Snippet;
		isBgTransparent?: boolean;
	}

	let { children, isBgTransparent = false }: CardProps = $props();
</script>

<div class={['card__wrapper', isBgTransparent && 'card__wrapper--bg-transparent']}>
	{@render children()}
</div>

<style lang="scss">
	.card__wrapper {
		display: flex;
		flex-direction: column;
		gap: 25px;
		width: 100%;

		&:not(.card__wrapper--bg-transparent) {
			padding: 35px;
			background-color: rgba(255, 255, 255, 0.6);
			border-radius: 35px;
			border: 1px solid rgba(255, 255, 255, 0.3);
			box-shadow:
				0 0px 32px rgba(0, 0, 0, 0.07),
				inset 0 1px 0 rgba(255, 255, 255, 0.5),
				inset 0 -1px 0 rgba(255, 255, 255, 0.1),
				inset 0 0 30px 5px rgba(255, 255, 255, 0.2);
			backdrop-filter: blur(5px);
		}
	}
</style>
