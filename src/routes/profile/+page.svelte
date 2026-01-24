<script lang="ts">
	import { goto } from '$app/navigation';
	import { userState } from '@/states/user.svelte';
	import { signOutCurrentUser } from '@/utils/auth/sign-out-current-user';

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

<h1>{userState.data?.firstname} {userState.data?.lastname}</h1>

<Button color="danger" onclick={handleSignOut}>Sign Out</Button>
