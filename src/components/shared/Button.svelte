<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ButtonColor } from '@/types/button-color';

	import Spinner from '@/components/shared/Spinner.svelte';

	interface ButtonProps {
		color?: ButtonColor;
		isDisabled?: boolean;
		isLoading?: boolean;
		onclick?: () => void;
		children: Snippet;
	}

	let {
		color = 'primary',
		isDisabled = false,
		isLoading = false,
		onclick,
		children
	}: ButtonProps = $props();
</script>

<button
	class="button"
	type="button"
	disabled={isDisabled}
	tabindex="0"
	data-color={color}
	data-state={isLoading ? 'loading' : 'default'}
	{onclick}
>
	<span class="button__label">{@render children()}</span>
	<span class="button__label"><Spinner size="sm" isIconOnly={true} /></span>
</button>

<style lang="scss">
	.button {
		width: 100%;
		height: 60px;
		border-radius: 30px;
		border: 1px solid rgba(255, 255, 255, 0.3);
		box-shadow:
			0 0px 32px rgba(0, 0, 0, 0.07),
			inset 0 1px 0 rgba(255, 255, 255, 0.5),
			inset 0 -1px 0 rgba(255, 255, 255, 0.1),
			inset 0 0 30px 5px rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(5px);
		cursor: pointer;
		overflow: hidden;
		transition:
			transform 0.25s cubic-bezier(0.44, 1.14, 0.43, 1.32),
			color 0.35s ease-in-out,
			background-image 0.45s ease-in-out;

		&[data-color='primary'] {
			color: rgb(var(--fg));
			background-image: linear-gradient(
				145deg,
				color-mix(in srgb, rgba(var(--primary-color, 0.5)), white 15%),
				color-mix(in srgb, rgba(var(--primary-color, 0.5)), black 5%)
			);

			&:disabled {
				color: color-mix(in srgb, rgb(var(--fg)), white 20%);
				background-image: linear-gradient(
					145deg,
					color-mix(in srgb, rgba(var(--primary-color, 0.5)), white 30%),
					color-mix(in srgb, rgba(var(--primary-color, 0.5)), white 25%)
				);
			}
		}

		&[data-color='danger'] {
			color: rgb(var(--bg));
			background-image: linear-gradient(
				145deg,
				color-mix(in srgb, rgba(var(--danger-color, 0.5)), white 15%),
				color-mix(in srgb, rgba(var(--danger-color, 0.5)), black 5%)
			);

			&:disabled {
				color: color-mix(in srgb, rgb(var(--bg)), black 5%);
				background-image: linear-gradient(
					145deg,
					color-mix(in srgb, rgba(var(--danger-color, 0.5)), white 30%),
					color-mix(in srgb, rgba(var(--danger-color, 0.5)), white 25%)
				);
			}
		}

		&[data-color='google'] {
			color: rgb(var(--bg));
			background-image: linear-gradient(
				145deg,
				color-mix(in srgb, rgba(var(--fg, 0.5)), white 2%),
				color-mix(in srgb, rgba(var(--fg, 0.5)), black 5%)
			);
		}

		&:disabled {
			cursor: text;
		}

		&:not(:disabled):active {
			transform: scale(0.95);
			transition: transform 0.35s cubic-bezier(0.33, 1.44, 0.43, 1.32);
			transition-delay: 0;
		}

		&__label {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 60px;
			font-size: 1rem;
			transition: transform 0.35s cubic-bezier(0.6, 0.5, 0.05, 1);

			.button[data-state='default'] & {
				transform: translateY(0);
			}

			.button[data-state='loading'] & {
				transform: translateY(-60px);
			}

			&:has(:global(.icon)) {
				justify-content: flex-start;
				gap: 0.8rem;
				font-weight: 600;
				padding: 0 calc((60px - 1.75rem) / 2);
			}

			:global(.spinner) {
				border-color: rgb(var(--fg));
			}

			:global(.icon) {
				aspect-ratio: 1;
				height: 1.75rem;
			}
		}
	}
</style>
