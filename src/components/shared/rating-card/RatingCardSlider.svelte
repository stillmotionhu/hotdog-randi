<script lang="ts">
	interface RatingCardSliderProps {
		value: number;
	}

	let { value }: RatingCardSliderProps = $props();
</script>

<progress class="rating-card__slider" max="10" {value}></progress>

<style lang="scss">
	.rating-card__slider {
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
			background-image: linear-gradient(
				145deg,
				color-mix(in srgb, rgba(var(--primary-color, 0.5)), white 15%),
				color-mix(in srgb, rgba(var(--primary-color, 0.5)), black 5%)
			);
			border-radius: 6px;
		}
	}
</style>
