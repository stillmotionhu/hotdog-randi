<script lang="ts">
	import type { Rating } from '@/collections/Rating';
	import type { RatingsFilterValue } from '@/types/rating-filter-value';
	import { userState } from '@/states/user.svelte';
	import { fetchRatingsByUserUid } from '@/utils/ratings/fetch-ratings-by-user-uid';

	import Input from '@/components/shared/Input.svelte';
	import RatingsFilter from '@/components/pages/ratings/ratings-filter/RatingsFilter.svelte';
	import LoadingWrapper from '@/components/shared/LoadingWrapper.svelte';
	import Spinner from '@/components/shared/Spinner.svelte';
	import RatingCard from '@/components/shared/rating-card/RatingCard.svelte';

	let ratings: Array<Rating> = $state<Array<Rating>>([]);
	let isReady: boolean = $state<boolean>(false);
	let isLoading: boolean = $state<boolean>(true);
	let hasSpinnerFadedOut: boolean = $state<boolean>(false);

	let searchValue: string = $state<string>('');
	let filterValue: RatingsFilterValue = $state<RatingsFilterValue>({
		order: 'date-desc'
	});

	const onSpinnerAnimationEnd = (): void => {
		hasSpinnerFadedOut = true;
		isReady = true;
	};

	const handleFilterValueChange = (value: RatingsFilterValue) => {
		filterValue = value;
	};

	$effect((): void => {
		if (!userState.uid) {
			return;
		}

		isLoading = true;
		isReady = false;
		hasSpinnerFadedOut = false;

		fetchRatingsByUserUid(userState.uid, filterValue.order).then((data: Array<Rating> | null) => {
			ratings = data || [];
			isLoading = false;
		});
	});
</script>

<header class="ratings__header">
	<div class="ratings__header__container">
		<Input type="search" name="search" placeholder="Search..." bind:value={searchValue} />
		<RatingsFilter {handleFilterValueChange} {filterValue} />
	</div>
</header>

{#if !hasSpinnerFadedOut}
	<LoadingWrapper>
		<Spinner shouldFadeOut={!isLoading} onAnimationEnd={onSpinnerAnimationEnd} />
	</LoadingWrapper>
{/if}

{#if isReady}
	<div class="ratings__wrapper">
		<div class="ratings__container">
			{#if ratings.length === 0}
				You have no ratings yet. You can change that!
			{:else}
				{#each ratings as rating (rating.uid)}
					<RatingCard {rating} />
				{/each}
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	@use '@/styles/breakpoint.scss' as *;

	@keyframes reveal-ratings-header-element {
		0% {
			opacity: 0;
			transform: scale(0.8);
		}

		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes fade-out-ratings {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	.ratings {
		&__header {
			position: fixed;
			top: 25px;
			left: 0;
			display: flex;
			place-content: center;
			width: 100%;
			z-index: 999;

			&__container {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				gap: 10px;
				width: 95vw;
			}

			:global(.input) {
				animation-name: reveal-ratings-header-element;
				animation-duration: 0.5s;
				animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
			}
		}

		&__wrapper {
			width: var(--container-width);
			padding-top: 75px;

			&.animate {
				animation-name: fade-out-ratings;
				animation-duration: 0.3s;
				animation-timing-function: ease-out;
			}
		}

		&__container {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 35px;

			@include breakpoint(lg) {
				display: flex;
				flex-direction: column;
			}
		}
	}
</style>
