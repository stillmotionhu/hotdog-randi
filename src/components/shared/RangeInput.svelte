<script lang="ts">
	import HeartIcon from '@/components/shared/icons/HeartIcon.svelte';

	interface RangeInputProps {
		name: string;
		label: string;
		value: number;
	}

	let { name, label, value = $bindable<number>(5) }: RangeInputProps = $props();
</script>

<div class="range-input">
	<div class="range-input__slider" style:--progress={value * 10 - (11 - value) + '%'}>
		<input
			class="range-input__slider__field"
			type="range"
			id={name}
			min="1"
			max="10"
			bind:value
			data-value={value}
		/>
		<span class="range-input__slider__thumb">
			<HeartIcon />
		</span>
	</div>
	<div class="range-input__label">
		<label class="range-input__label__text" for={name}>{label}</label>
		<span class="range-input__label__score">{value}</span>
	</div>
</div>

<style lang="scss">
	.range-input {
		display: flex;
		flex-direction: column-reverse;
		gap: 10px;
		width: 100%;

		:global(.input) ~ & {
			margin-top: 25px;
			margin-bottom: 3px;
		}

		&__slider {
			position: relative;

			&::before,
			&::after {
				content: '';
				position: absolute;
				top: 2px;
				left: 0;
				display: block;
				height: 12px;
			}

			&::before {
				width: 100%;
				background-color: rgba(205, 205, 205, 0.5);
				border-radius: 6px;
				box-shadow:
					0 0px 32px rgba(0, 0, 0, 0.07),
					inset 0 1px 0 rgba(255, 255, 255, 0.5),
					inset 0 -1px 0 rgba(255, 255, 255, 0.1),
					inset 0 0 30px 5px rgba(255, 255, 255, 0.2);
				backdrop-filter: blur(5px);
				z-index: -2;
			}

			&::after {
				width: var(--progress);
				background-color: rgb(var(--primary-color));
				border-radius: 6px;
				z-index: -1;
			}

			&__field {
				width: 100%;
				appearance: none;
				-webkit-appearance: none;
				background: transparent;

				&::-webkit-slider-thumb {
					opacity: 0;
				}
			}

			&__thumb {
				pointer-events: none;

				:global(.icon) {
					position: absolute;
					top: 0;
					left: var(--progress);
					aspect-ratio: 1;
					height: 2em;
					transform: translate(-50%, -7px);
					fill: rgb(var(--element-bg));
					stroke: rgb(var(--primary-color));
					stroke-width: 2px;
					stroke-linecap: round;
					stroke-linejoin: round;

					.range-input__slider__field[data-value='1'] ~ & {
						transform: translate(-10%, -7px);
					}

					.range-input__slider__field[data-value='10'] ~ & {
						transform: translate(-75%, -7px);
					}
				}
			}
		}

		&__label {
			display: flex;
			justify-content: space-between;

			&__text,
			&__score {
				font-weight: 600;
			}
		}
	}
</style>
