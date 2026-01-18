<script lang="ts">
	import RatingCardSlider from './RatingCardSlider.svelte';

	interface RatingCardItemProps {
		label: string;
		score: number;
		notes?: string;
	}

	let { label, score, notes }: RatingCardItemProps = $props();
</script>

<div class="rating-card__item">
	<div class="rating-card__item__header">
		<span class="rating-card__item__label">{label}</span>
		<span class="rating-card__item__score">{score}</span>
	</div>

	<RatingCardSlider value={score} />

	{#if notes}
		<span class="rating-card__item__notes">{notes}</span>
	{/if}
</div>

<style lang="scss">
	.rating-card__item {
		display: flex;
		flex-direction: column;
		gap: 10px;

		&__header {
			display: flex;
			justify-content: space-between;
		}

		&__label,
		&__score {
			font-weight: 600;
		}

		&__notes {
			color: rgb(127, 127, 127);
			font-size: 0.9em;
			margin-top: 3px;
		}
	}
</style>
