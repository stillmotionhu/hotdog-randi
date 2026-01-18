<script lang="ts">
	import HeartIcon from '@/components/shared/icons/HeartIcon.svelte';

	interface RatingCardSliderProps {
		value: number;
	}

	let { value }: RatingCardSliderProps = $props();
</script>

<div class="rating-card__slider" style:--thumb-left={value * 10 + '%'}>
	<progress class="rating-card__slider__progress" max="10" {value}></progress>
	<span class="rating-card__slider__thumb">
		<HeartIcon />
	</span>
</div>

<style lang="scss">
	.rating-card__slider {
		position: relative;

		&__progress {
			width: 100%;
			height: 12px;
			border-radius: 6px;
			box-shadow:
				0 0px 32px rgba(0, 0, 0, 0.07),
				inset 0 1px 0 rgba(255, 255, 255, 0.5),
				inset 0 -1px 0 rgba(255, 255, 255, 0.1),
				inset 0 0 30px 5px rgba(255, 255, 255, 0.2);
			backdrop-filter: blur(5px);

			&::-webkit-progress-bar {
				background-color: rgba(205, 205, 205, 0.5);
				border-radius: 6px;
			}

			&::-webkit-progress-value {
				background-color: rgb(var(--primary-color));
				border-radius: 6px;
			}
		}

		&__thumb {
			:global(.icon) {
				position: absolute;
				top: 0;
				left: var(--thumb-left);
				aspect-ratio: 1;
				height: 2em;
				transform: translate(calc(-100% + 2px), -7px);
				fill: rgb(var(--element-bg));
				stroke: rgb(var(--primary-color));
				stroke-width: 2px;
				stroke-linecap: round;
				stroke-linejoin: round;
			}
		}
	}
</style>
