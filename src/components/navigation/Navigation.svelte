<script lang="ts">
	import type { Route } from '@/types/route';
	import { navigationState } from '@/states/navigation.svelte';

	import NavigationLink from '@/components/navigation/NavigationLink.svelte';

	import HomeIcon from '@/components/shared/icons/HomeIcon.svelte';
	import RatingsIcon from '@/components/shared/icons/RatingsIcon.svelte';
	import PlusIcon from '@/components/shared/icons/PlusIcon.svelte';
	import SearchIcon from '@/components/shared/icons/SearchIcon.svelte';
	import ProfileIcon from '@/components/shared/icons/ProfileIcon.svelte';

	let hasRevealAnimationEnded: boolean = $state<boolean>(false);

	const handleAnimationEnd = (event: AnimationEvent): void => {
		if (!event.animationName === 'reveal-navigation') {
			return;
		}

		hasRevealAnimationEnded = true;
	};

	const ROUTES: Array<Route> = [
		{
			href: '/',
			label: 'Home',
			icon: HomeIcon
		},
		{
			href: '/ratings',
			label: 'Ratings',
			icon: RatingsIcon
		},
		{
			href: '/new',
			label: 'New Rating',
			icon: PlusIcon
		},
		{
			href: '/search',
			label: 'Search',
			icon: SearchIcon
		},
		{
			href: '/profile',
			label: 'Profile',
			icon: ProfileIcon
		}
	];
</script>

<nav
	class={['navigation__wrapper', !hasRevealAnimationEnded && 'animate']}
	onanimationend={handleAnimationEnd}
>
	<div class="navigation__container">
		<ul
			class="navigation__list"
			style:--active-route-pill-width={navigationState.activeRoutePill.width + 'px'}
			style:--active-route-pill-left={navigationState.activeRoutePill.left + 'px'}
		>
			{#each ROUTES as route (route.href)}
				<li class="navigation__item">
					<NavigationLink href={route.href}>
						<span class="navigation__link__label">{route.label}</span>
						<span class="navigation__link__icon">
							<route.icon />
						</span>
					</NavigationLink>
				</li>
			{/each}
		</ul>
	</div>
</nav>

<style lang="scss">
	@use '@/styles/breakpoint.scss' as *;

	@keyframes -global-reveal-navigation {
		0% {
			opacity: 0;
			transform: scale(0.8) translateY(15px);
		}

		100% {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	.navigation {
		&__wrapper {
			position: fixed;
			left: 0;
			top: 25px;
			display: flex;
			justify-content: center;
			width: 100%;
			z-index: 999;
			animation-name: reveal-navigation;
			animation-duration: 0.5s;
			animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);

			@include breakpoint(sm) {
				top: unset;
				bottom: 25px;
			}
		}

		&__container {
			width: 95vw;
			height: 70px;
			padding: 5px;
			background-color: rgba(255, 255, 255, 0.6);
			border-radius: 35px;
			border: 1px solid rgba(255, 255, 255, 0.3);
			box-shadow:
				0 0px 32px rgba(0, 0, 0, 0.1),
				inset 0 1px 0 rgba(255, 255, 255, 0.5),
				inset 0 -1px 0 rgba(255, 255, 255, 0.1),
				inset 0 0 30px 5px rgba(255, 255, 255, 0.2);
			backdrop-filter: blur(5px);
		}

		&__list {
			display: flex;
			justify-content: space-between;
			align-items: center;
			list-style: none;

			&::before {
				content: '';
				display: block;
				position: absolute;
				top: 50%;
				left: calc(var(--active-route-pill-left));
				width: calc(var(--active-route-pill-width));
				height: 60px;
				background-image: linear-gradient(
					145deg,
					color-mix(in srgb, rgba(var(--primary-color, 0.5)), white 15%),
					color-mix(in srgb, rgba(var(--primary-color, 0.5)), black 5%)
				);
				border-radius: 33px;
				border: 1px solid rgba(255, 255, 255, 0.3);
				box-shadow:
					0 0px 32px rgba(0, 0, 0, 0.07),
					inset 0 1px 0 rgba(255, 255, 255, 0.5),
					inset 0 -1px 0 rgba(255, 255, 255, 0.1),
					inset 0 0 30px 5px rgba(255, 255, 255, 0.2);
				backdrop-filter: blur(5px);
				transform: translateY(-50%);
				z-index: -1;
				transition:
					left 0.8s cubic-bezier(0.28, 1.47, 0.13, 0.97),
					width 0.7s cubic-bezier(0.28, 1.47, 0.13, 0.97);

				.navigation__wrapper.animate & {
					transition: none;
				}
			}
		}

		&__item {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 60px;

			:global(.icon) {
				aspect-ratio: 1;
				height: 20px;
				stroke: rgb(var(--fg));
				stroke-width: 0.4;

				@include breakpoint(md) {
					height: 17px;
				}

				@include breakpoint(sm) {
					height: 32px;
				}
			}
		}

		&__link {
			&__label {
				@include breakpoint(sm) {
					display: none;
				}
			}
		}
	}
</style>
