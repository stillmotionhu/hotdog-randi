<script lang="ts">
	import type { Snippet } from 'svelte';

	interface FormProps {
		children: Snippet;
	}

	let { children }: FormProps = $props();
</script>

<form class="form">
	{@render children()}
</form>

<style lang="scss">
	.form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
