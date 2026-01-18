<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { userState } from '@/states/user.svelte';
	import {
		updateNagivationActiveRoute,
		updateNavigationActiveRoutePillWidthAndPosition
	} from '@/states/navigation.svelte';

	import { ADMIN_ROUTES, AUTH_ROUTES, NO_AUTH_ROUTES } from '@/constants';

	import Fonts from '@/components/layout/Fonts.svelte';
	import AppContainer from '@/components/layout/AppContainer.svelte';
	import PageWrapper from '@/components/layout/PageWrapper.svelte';
	import Navigation from '@/components/navigation/Navigation.svelte';

	interface LayoutProps {
		children: Snippet;
	}

	let { children }: LayoutProps = $props();

	/* Set up page guards and some other stuff of navigating (e.g. navigation pill
	position updating.). */
	$effect((): void => {
		if (userState.isLoading) {
			return;
		}

		const currentPath = page.url.pathname;

		// TODO: Custom redirects for each guards.
		if (
			// Catch if a signed in user tries to go to an admin page.
			(ADMIN_ROUTES.includes(currentPath) &&
				userState.isSignedIn &&
				userState.data &&
				userState.data.role !== 'admin') ||
			// Catch if a signed in user tries to go to a no-auth page.
			(NO_AUTH_ROUTES.includes(currentPath) && userState.isSignedIn) ||
			// Catch if a visitor tries to go to an auth protected page.
			(AUTH_ROUTES.includes(currentPath) && !userState.isSignedIn)
		) {
			goto('/');
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
