<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { beforeNavigate, goto } from '$app/navigation';
	import type { BeforeNavigate } from '@sveltejs/kit';
	import { userState } from '@/states/user.svelte';
	import {
		updateNagivationActiveRoute,
		updateNavigationActiveRoutePillWidthAndPosition
	} from '@/states/navigation.svelte';
	import { smoothScrollToTop } from '@/utils/smooth-scroll-to-top';

	import { ADMIN_ROUTES, AUTH_ROUTES, NO_AUTH_ROUTES } from '@/constants';

	import Fonts from '@/components/layout/Fonts.svelte';
	import AppContainer from '@/components/layout/AppContainer.svelte';
	import PageWrapper from '@/components/layout/PageWrapper.svelte';
	import Navigation from '@/components/navigation/Navigation.svelte';

	interface LayoutProps {
		children: Snippet;
	}

	let { children }: LayoutProps = $props();

	beforeNavigate(({ from, to, cancel }: BeforeNavigate): void => {
		// Check if the navigation is valid. There is a route where the navigation originates from, and the is a route where it"s headed.
		if (!(from && to && to.route.id)) {
			return;
		}

		// If the user wants to navigate to the same page where they are now, just
		// cancel it and scroll to the top of the page.
		// If we don't cancel it, the page scrolls to the top, and it overrides the
		// smooth scrolling.
		if (from.route.id === to.route.id) {
			cancel();
			smoothScrollToTop();

			return;
		}
	});

	/* Set up page guards and some other stuff of navigating (e.g. navigation pill
	position updating.). */
	$effect((): void => {
		if (userState.isLoading) {
			return;
		}

		const currentPath = page.url.pathname;

		if (
			ADMIN_ROUTES.includes(currentPath) &&
			!(userState.isSignedIn && userState.data && userState.data.role === 'admin')
		) {
			goto('/');
		} else if (NO_AUTH_ROUTES.includes(currentPath) && userState.isSignedIn) {
			goto('/');
		} else if (AUTH_ROUTES.includes(currentPath) && !userState.isSignedIn) {
			goto('/sign-in');
		}

		updateNagivationActiveRoute();
	});
</script>

<svelte:window
	onresize={(): void => {
		updateNavigationActiveRoutePillWidthAndPosition();
	}}
/>

<Fonts />

<AppContainer>
	{#if !userState.isLoading}
		{#if userState.isSignedIn}
			<Navigation />
		{/if}

		<PageWrapper>
			{@render children()}
		</PageWrapper>
	{/if}
</AppContainer>

<style lang="scss">
	@use '@/styles/normalize.scss';
	@use '@/styles/variables.scss';

	:global {
		* {
			margin: 0;
			padding: 0;
			border: 0;
			box-sizing: border-box;
		}

		body {
			font-family: 'Stack Sans Text', Helvetica, sans-serif;
			color: rgb(var(--fg));
			background-color: rgb(var(--bg));
		}

		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			margin: 0;
		}
	}
</style>
