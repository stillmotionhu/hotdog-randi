import { page } from '$app/state';
import type { NavigationRouteRef } from '@/types/navigation-route-ref';

interface NavigationConfiguration {
	routes: Array<NavigationRouteRef>;
	activeRoute: string;
	activeRoutePill: {
		width: number;
		left: number;
	};
}

const INITIAL_NAVIGATION_CONFIGURATION: NavigationConfiguration = {
	routes: [],
	activeRoute: '/',
	activeRoutePill: {
		width: 0,
		left: 0
	}
};

export const navigationState: NavigationConfiguration = $state<NavigationConfiguration>(
	INITIAL_NAVIGATION_CONFIGURATION
);

export function pushNavigationRoute(element: HTMLAnchorElement, pathname: string): void {
	navigationState.routes.push({
		element,
		pathname
	});
}

export function updateNavigationActiveRoutePillWidthAndPosition(): void {
	const currentRoute: NavigationRouteRef | undefined = navigationState.routes.find(
		(route: NavigationRouteRef) => route.pathname === navigationState.activeRoute
	);

	if (typeof currentRoute === 'undefined') {
		console.error('There\'s no route with pathname "' + navigationState.activeRoute + '"');
		return;
	}

	navigationState.activeRoutePill.width = currentRoute.element.offsetWidth;
	navigationState.activeRoutePill.left = currentRoute.element.offsetLeft;
}

export function updateNagivationActiveRoute(): void {
	navigationState.activeRoute = page.url.pathname;

	updateNavigationActiveRoutePillWidthAndPosition();
}
