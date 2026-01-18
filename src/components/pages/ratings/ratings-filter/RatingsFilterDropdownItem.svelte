<script lang="ts">
	import type { RatingsFilterValue } from '@/types/rating-filter-value';
	import type { Snippet } from 'svelte';

	interface RatingsFilterDropdownItemProps {
		key: string;
		filterValue: RatingsFilterValue;
		onclick: () => void;
		children: Snippet;
	}

	let { key, filterValue, onclick, children }: RatingsFilterDropdownItemProps = $props();
</script>

<li
	class="ratings__filter__dropdown__item"
	role="button"
	tabindex="1"
	data-selected={filterValue.order === key}
	{onclick}
	onkeydown={() => null}
>
	<div class="ratings__filter__dropdown__item__label">
		<span class="ratings__filter__dropdown__item__label__text">{@render children()}</span>
	</div>

	<svg
		class="ratings__filter__dropdown__item__checkmark"
		width="12px"
		height="9px"
		viewBox="0 0 12 9"
	>
		<polyline points="1 5 4 8 11 1"></polyline>
	</svg>
</li>

<style lang="scss">
	.ratings__filter__dropdown__item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		list-style: none;
		cursor: pointer;
		padding: 17px 25px;
		border-radius: 50px;
		transition: background 0.2s ease-out;

		&:hover {
			background-color: rgba(0, 0, 0, 0.05);
		}

		&__label {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 14px;

			:global(.icon) {
				aspect-ratio: 1;
				height: 2em;
			}

			&__text {
				font-size: 1em;
				font-weight: 400;
				color: rgb(var(--fg));

				.ratings__filter__dropdown__item[data-selected='true'] & {
					font-weight: 600;
				}
			}
		}

		&__checkmark {
			fill: none;
			stroke: rgb(var(--fg));
			stroke-width: 2;
			stroke-linecap: round;
			stroke-linejoin: round;
			stroke-dasharray: 16px;
			stroke-dashoffset: 16px;
			transform: translate3d(0, 0, 0);
			transition: all 0.1s ease-in;
			transition-delay: 0s;

			.ratings__filter__dropdown__item[data-selected='true'] & {
				stroke-dashoffset: 0;
				transition: all 0.2s ease-out;
				transition-delay: 0.1s;
			}
		}
	}
</style>
