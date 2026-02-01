<script lang="ts">
	import { goto } from '$app/navigation';
	import { signOutCurrentUser } from '@/utils/auth/sign-out-current-user';

	import PageContainer from '@/components/layout/PageContainer.svelte';
	import PageTitle from '@/components/shared/PageTitle.svelte';
	import Button from '@/components/shared/Button.svelte';

	const handleSignOut = () => {
		// TODO: Better, visual handling.
		signOutCurrentUser()
			.then(() => {
				goto('/sign-in');
			})
			.catch((error) => {
				console.error('Error signing out:', error);
			});
	};
</script>

<PageContainer>
	<PageTitle>Settings</PageTitle>

	<Button size="compact" color="danger" onclick={handleSignOut}>Sign Out</Button>
</PageContainer>
