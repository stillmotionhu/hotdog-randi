import type { Component } from 'svelte';

export interface Route {
	href: string;
	label: string;
	icon: Component;
}
