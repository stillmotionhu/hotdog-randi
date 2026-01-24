<script lang="ts">
	import { goto } from '$app/navigation';
	import { signInUser } from '@/utils/auth/sign-in-user';

	import PageContainer from '@/components/layout/PageContainer.svelte';
	import PageTitle from '@/components/shared/PageTitle.svelte';
	import Form from '@/components/shared/Form.svelte';
	import Input from '@/components/shared/Input.svelte';
	import Button from '@/components/shared/Button.svelte';
	import type { UserCredential } from 'firebase/auth';

	let email: string = $state<string>('');
	let password: string = $state<string>('');

	let isSubmitButtonDisabled: boolean = $state<boolean>(true);
	let isLoading: boolean = $state<boolean>(false);

	const handleSubmit = async (): Promise<void> => {
		if (!(email && password)) {
			return;
		}

		isLoading = true;

		try {
			await signInUser(email, password);
		} catch (error) {
			console.error('Error signing in:', error);

			password = '';
			isLoading = false;
		}
	};

	$effect(() => {
		isSubmitButtonDisabled = !(email.trim() && password.trim());
	});
</script>

<PageContainer isCentered>
	<PageTitle>Sign In</PageTitle>

	<Form>
		<Input type="email" name="email" label="Email Address" bind:value={email} required />
		<Input type="password" name="password" label="Password" bind:value={password} required />
		<Button isDisabled={isSubmitButtonDisabled} {isLoading} onclick={handleSubmit}>Sign In</Button>
	</Form>
</PageContainer>
