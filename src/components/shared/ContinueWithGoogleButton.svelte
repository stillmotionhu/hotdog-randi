<script lang="ts">
	import { signInUserWithGoogle } from '@/utils/auth/sign-in-user-with-google';

	import Button from '@/components/shared/Button.svelte';
	import GoogleIcon from '@/components/shared/icons/GoogleIcon.svelte';

	const handleContinueWithGoogle = async (): Promise<void> => {
		try {
			await signInUserWithGoogle();
		} catch (error) {
			console.error('Error signing in with Google:', error);
		}
	};
</script>

<Button color="google" onclick={handleContinueWithGoogle}>
	<GoogleIcon />
	Continue with Google
</Button>
