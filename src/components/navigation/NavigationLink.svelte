<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { navigationState, pushNavigationRoute } from '@/states/navigation.svelte';

	interface NavigationLinkProps {
		href: string;
		children: Snippet;
	}

	let { href, children }: NavigationLinkProps = $props();

	let navigationLinkRef: HTMLAnchorElement;

	onMount((): void => {
		pushNavigationRoute(navigationLinkRef, href);
	});
</script>

<a
	class={['navigation__link', navigationState.activeRoute === href && 'navigation__link--active']}
	{href}
	bind:this={navigationLinkRef}
>
	{@render children()}
</a>

<style lang="scss">
	@use '@/styles/breakpoint' as *;

	.navigation__link {
		display: flex;
		flex-direction: column-reverse;
		justify-content: center;
		align-items: center;
		gap: 5px;
		width: 100%;
		height: 60px;
		font-size: 14px;
		color: rgb(var(--fg));
		text-decoration: none;

		@include breakpoint(md) {
			gap: 7px;
			font-size: 12px;
		}
	}
</style>
