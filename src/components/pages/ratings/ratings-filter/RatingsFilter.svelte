<script lang="ts">
	import type { RatingsFilterValue } from '@/types/rating-filter-value';
	import type { RatingsOrder } from '@/types/ratings-order';

	import RatingsFilterDropdownItem from '@/components/pages/ratings/ratings-filter/RatingsFilterDropdownItem.svelte';

	interface RatingsFilterProps {
		filterValue: RatingsFilterValue;
		handleFilterValueChange: (filter: RatingsFilterValue) => void;
	}

	let { handleFilterValueChange, filterValue }: RatingsFilterProps = $props();

	let ratingsFilterRef: HTMLDivElement;
	let isOpen: boolean = $state<boolean>(false);

	const handleWindowClick = (event: MouseEvent): void => {
		if (!isOpen) {
			return;
		}

		const targetNode = event.target as Node;

		if (!ratingsFilterRef.contains(targetNode)) {
			isOpen = false;
		}
	};

	const handleDropdownItemClick = (key: RatingsOrder): void => {
		handleFilterValueChange({
			order: key
		});

		isOpen = false;
	};
</script>

<svelte:window onclick={handleWindowClick} />

<div class={['ratings__filter', isOpen && 'open']} bind:this={ratingsFilterRef}>
	<button
		class="ratings__filter__trigger"
		aria-label="Open Filter Options"
		onclick={() => {
			isOpen = !isOpen;
		}}
	>
		<div class="ratings__filter__trigger__container">
			<span class="ratings__filter__trigger__line"></span>
			<span class="ratings__filter__trigger__line"></span>
			<span class="ratings__filter__trigger__line"></span>
		</div>
	</button>

	<ul class="ratings__filter__dropdown">
		<RatingsFilterDropdownItem
			key="date-desc"
			{filterValue}
			onclick={() => handleDropdownItemClick('date-desc')}
		>
			Date: Newest First
		</RatingsFilterDropdownItem>
		<RatingsFilterDropdownItem
			key="date-asc"
			{filterValue}
			onclick={() => handleDropdownItemClick('date-asc')}
		>
			Date: Oldest First
		</RatingsFilterDropdownItem>
		<RatingsFilterDropdownItem
			key="score-desc"
			{filterValue}
			onclick={() => handleDropdownItemClick('score-desc')}
		>
			Score: Highest First
		</RatingsFilterDropdownItem>
		<RatingsFilterDropdownItem
			key="score-asc"
			{filterValue}
			onclick={() => handleDropdownItemClick('score-asc')}
		>
			Score: Lowest First
		</RatingsFilterDropdownItem>
	</ul>
</div>

<style lang="scss">
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

	.ratings__filter {
		position: relative;
		animation-name: reveal-ratings-header-element;
		animation-duration: 0.5s;
		animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
		animation-fill-mode: backwards;
		animation-delay: 0.1s;

		&__trigger {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 60px;
			height: 60px;
			background-color: rgba(255, 255, 255, 0.6);
			border-radius: 30px;
			border: 1px solid rgba(255, 255, 255, 0.3);
			box-shadow:
				0 0px 32px rgba(0, 0, 0, 0.1),
				inset 0 1px 0 rgba(255, 255, 255, 0.5),
				inset 0 -1px 0 rgba(255, 255, 255, 0.1),
				inset 0 0 30px 5px rgba(255, 255, 255, 0.2);
			backdrop-filter: blur(5px);
			cursor: pointer;
			transition: transform 0.35s cubic-bezier(0.44, 1.14, 0.43, 1.32);

			.ratings__filter.open & {
				transform: scale(0.9);
				transition: transform 0.45s cubic-bezier(0.44, 1.14, 0.43, 1.32);
			}

			&__line {
				display: block;
				position: absolute;
				height: 2px;
				background-color: rgb(var(--fg));
				transform: rotate(0);
				transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);

				&:nth-child(1) {
					top: 0;
					left: 0;
					width: 25px;

					.ratings__filter.open & {
						top: 7px;
						transform: rotate(135deg);
					}
				}

				&:nth-child(2) {
					top: 7px;
					left: 4px;
					width: 17px;

					.ratings__filter.open & {
						left: 12px;
						width: 0;
					}
				}

				&:nth-child(3) {
					top: 14px;
					left: 8px;
					width: 9px;

					.ratings__filter.open & {
						top: 7px;
						left: 0;
						width: 25px;
						transform: rotate(-135deg);
					}
				}
			}

			&__container {
				position: relative;
				width: 25px;
				height: 16px;
			}
		}

		&__dropdown {
			position: absolute;
			top: 75px;
			right: 0;
			display: flex;
			flex-direction: column;
			gap: 5px;
			width: 275px;
			padding: 7px;
			background-color: rgba(255, 255, 255, 0.6);
			border-radius: 35px;
			border: 1px solid rgba(255, 255, 255, 0.3);
			box-shadow:
				0 0px 32px rgba(0, 0, 0, 0.1),
				inset 0 1px 0 rgba(255, 255, 255, 0.5),
				inset 0 -1px 0 rgba(255, 255, 255, 0.1),
				inset 0 0 30px 5px rgba(255, 255, 255, 0.2);
			backdrop-filter: blur(5px);
			visibility: hidden;
			transform: scale(0.3, 0.6) rotateX(-90deg) translateY(-10px);
			transform-origin: top right;
			opacity: 0;
			transition:
				visibility 0.5s linear,
				transform 0.25s ease-out,
				opacity 0.15s ease-out;
			transition-delay: 0s;

			.ratings__filter.open & {
				visibility: visible;
				transform: scale(1) rotateX(0) translateY(0);
				opacity: 1;
				transition:
					transform 0.5s cubic-bezier(0.28, 1.47, 0.13, 0.97),
					opacity 0.25s ease;
				transition-delay: 0.1s;
			}
		}
	}
</style>
