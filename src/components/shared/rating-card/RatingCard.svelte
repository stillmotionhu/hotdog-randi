<script lang="ts">
	import { onMount } from 'svelte';
	import type { Rating } from '@/collections/Rating';
	import { dateStringFromTimestamp } from '@/utils/date-string-from-timestamp';

	import RatingCardItem from './RatingCardItem.svelte';

	interface RatingCardProps {
		rating: Rating;
	}

	let { rating }: RatingCardProps = $props();

	let revealed: boolean = $state<boolean>(false);
	let shouldReveal: boolean = $state<boolean>(false);
	let ratingCardRef: HTMLElement;
	let intersectionObserver: IntersectionObserver;

	const handleAnimationEnd = (): void => {
		shouldReveal = false;
		revealed = true;
	};

	onMount((): void => {
		const intersectionObserverCallback: IntersectionObserverCallback = (
			entries: Array<IntersectionObserverEntry>
		): void => {
			const entry: IntersectionObserverEntry = entries[0];

			if (!entry.isIntersecting) {
				return;
			}

			shouldReveal = true;
		};
		const intersectionObserverOptions: IntersectionObserverInit = {
			root: document,
			rootMargin: '0px',
			threshold: 0.15
		};

		intersectionObserver = new IntersectionObserver(
			intersectionObserverCallback,
			intersectionObserverOptions
		);
		intersectionObserver.observe(ratingCardRef);
	});

	$effect((): void => {
		if (shouldReveal) {
			intersectionObserver.disconnect();
		}
	});
</script>

<section
	class={['rating-card', !(revealed || shouldReveal) && 'hidden', shouldReveal && 'animate']}
	bind:this={ratingCardRef}
	onanimationend={handleAnimationEnd}
>
	<header class="rating-card__header">
		<h1 class="rating-card__location-name">{rating.locationName}</h1>
		<h2 class="rating-card__location-address">{rating.locationAddress}</h2>
		<span class="rating-card__date">{dateStringFromTimestamp(rating.date)}</span>
	</header>

	<main class="rating-card__container">
		<RatingCardItem label="Dog" score={rating.dogRating} notes={rating.dogNotes} />
		<RatingCardItem label="Bun" score={rating.bunRating} notes={rating.bunNotes} />
		<RatingCardItem label="Sauce" score={rating.sauceRating} notes={rating.sauceNotes} />
		<RatingCardItem
			label="Sauce to Dog Ratio"
			score={rating.sauceToDogRatioRating}
			notes={rating.sauceToDogRatioNotes}
		/>
		<RatingCardItem
			label="Dog to Bun Ratio"
			score={rating.dogToBunRatioRating}
			notes={rating.dogToBunRatioNotes}
		/>
		<RatingCardItem
			label="Overall Taste"
			score={rating.overallTasteRating}
			notes={rating.overallTasteNotes}
		/>
		<RatingCardItem
			label="Customer Service"
			score={rating.customerServiceRating}
			notes={rating.customerServiceNotes}
		/>
		<RatingCardItem
			label="Overall Experience"
			score={rating.overallExperienceRating}
			notes={rating.overallExperienceNotes}
		/>
		<RatingCardItem label="Score" score={rating.score} />
	</main>
</section>

<style lang="scss">
	@use '@/styles/breakpoint' as *;

	@keyframes reveal-rating-card {
		0% {
			opacity: 0;
			transform: scale(0.8);
		}

		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	.rating-card {
		display: flex;
		flex-direction: column;
		gap: 25px;
		width: 100%;
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

		&.hidden {
			opacity: 0;
		}

		&.animate {
			animation-name: reveal-rating-card;
			animation-duration: 0.55s;
			animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
			animation-fill-mode: backwards;
			animation-delay: 0.05s;

			&:nth-child(2n) {
				animation-delay: 0.1s;

				@include breakpoint(lg) {
					animation-delay: 0.05s;
				}
			}
		}

		&__header {
			display: flex;
			flex-direction: column;
			gap: 5px;
		}

		&__location-name {
			font-size: 1.5em;
			text-transform: uppercase;
		}

		&__location-address {
			font-size: 1em;
			font-weight: 400;
		}

		&__date {
			font-size: 0.8em;
			color: rgb(120, 120, 120);
		}

		&__container {
			display: flex;
			flex-direction: column;
			gap: 25px;
		}
	}
</style>
