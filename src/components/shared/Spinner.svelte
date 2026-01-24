<script lang="ts">
	import type { SpinnerSize } from '@/types/spinner-size';

	interface SpinnerProps {
		size?: SpinnerSize;
		isIconOnly?: boolean;
		shouldFadeOut?: boolean;
		onAnimationEnd?: () => void;
	}

	let { size = 'md', isIconOnly = false, shouldFadeOut, onAnimationEnd }: SpinnerProps = $props();

	const handleAnimationEnd = (event: AnimationEvent): void => {
		if (event.animationName !== 'spinner-fade-out' || !onAnimationEnd) {
			return;
		}

		onAnimationEnd();
	};
</script>

{#if isIconOnly}
	<span class="spinner" data-size={size}></span>
{:else}
	<div
		class={['spinner__container', shouldFadeOut && 'animate']}
		onanimationend={handleAnimationEnd}
	>
		<span class="spinner" data-size={size}></span>
	</div>
{/if}

<style lang="scss">
	@keyframes spinner-clip-path {
		0% {
			clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
		}

		12.5% {
			clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%);
		}

		25% {
			clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 100%);
		}

		50% {
			clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
		}

		62.5% {
			clip-path: polygon(50% 50%, 100% 0, 100% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
		}

		75% {
			clip-path: polygon(50% 50%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 50% 100%, 0% 100%);
		}

		100% {
			clip-path: polygon(50% 50%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 0% 100%);
		}
	}

	@keyframes spinner-transform {
		0% {
			transform: scaleY(1) rotate(0deg);
		}

		49.99% {
			transform: scaleY(1) rotate(135deg);
		}

		50% {
			transform: scaleY(-1) rotate(0deg);
		}

		100% {
			transform: scaleY(-1) rotate(-135deg);
		}
	}

	@keyframes -global-spinner-fade-in {
		0% {
			opacity: 0;
			transform: scale(0.55);
		}

		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes -global-spinner-fade-out {
		0% {
			opacity: 1;
			transform: scale(1);
		}

		100% {
			opacity: 0;
			transform: scale(0.75);
		}
	}

	.spinner {
		display: block;
		aspect-ratio: 1;
		border-radius: 50%;
		border: 6px solid rgb(var(--primary-color));
		animation:
			spinner-clip-path 0.8s infinite linear alternate,
			spinner-transform 1.6s infinite linear;

		&[data-size='lg'] {
			width: 50px;

			&::before {
				width: 54px;
			}
		}

		&[data-size='md'] {
			width: 40px;
			border-width: 5px;
		}

		&[data-size='sm'] {
			width: 23px;
			border-width: 3px;
		}

		&__container {
			display: block;
			content: '';
			aspect-ratio: 1;
			width: auto;
			padding: 8px;
			background-color: rgba(255, 255, 255, 0.6);
			border-radius: 35px;
			border: 1px solid rgba(255, 255, 255, 0.3);
			box-shadow:
				0 0px 32px rgba(0, 0, 0, 0.1),
				inset 0 1px 0 rgba(255, 255, 255, 0.5),
				inset 0 -1px 0 rgba(255, 255, 255, 0.1),
				inset 0 0 30px 5px rgba(255, 255, 255, 0.2);
			backdrop-filter: blur(5px);
			animation-name: spinner-fade-in;
			animation-duration: 0.3s;
			animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.075);

			&.animate {
				animation-name: spinner-fade-out;
				animation-duration: 0.25s;
				animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
			}
		}
	}
</style>
