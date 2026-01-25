<script lang="ts">
	import { signInUserWithEmailAndPassword } from '@/utils/auth/sign-in-user-with-email-and-password';

	import PageContainer from '@/components/layout/PageContainer.svelte';
	import Card from '@/components/shared/card/Card.svelte';
	import CardHeader from '@/components/shared/card/CardHeader.svelte';
	import CardTitle from '@/components/shared/card/CardTitle.svelte';
	import CardContent from '@/components/shared/card/CardContent.svelte';
	import CardFooter from '@/components/shared/card/CardFooter.svelte';
	import Form from '@/components/shared/Form.svelte';
	import FormSeparator from '@/components/shared/FormSeparator.svelte';
	import Input from '@/components/shared/Input.svelte';
	import Button from '@/components/shared/Button.svelte';
	import ContinueWithGoogleButton from '@/components/shared/ContinueWithGoogleButton.svelte';

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
			await signInUserWithEmailAndPassword(email, password);
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
	<Card isBgTransparent>
		<CardHeader>
			<CardTitle>Sign In</CardTitle>
		</CardHeader>

		<CardContent>
			<Form>
				<Input type="email" name="email" label="Email Address" bind:value={email} required />
				<Input type="password" name="password" label="Password" bind:value={password} required />
				<Button
					type="submit"
					isDisabled={isSubmitButtonDisabled}
					{isLoading}
					onclick={handleSubmit}
				>
					Sign In
				</Button>
			</Form>
		</CardContent>

		<CardFooter>
			<p>Don't have an account? <a href="/sign-up">Sign Up</a></p>

			<FormSeparator />

			<ContinueWithGoogleButton />
		</CardFooter>
	</Card>
</PageContainer>
