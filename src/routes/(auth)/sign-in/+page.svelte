<script lang="ts">
	import { signInUser } from '@/utils/auth/sign-in-user';

	import PageContainer from '@/components/layout/PageContainer.svelte';
	import Card from '@/components/shared/card/Card.svelte';
	import CardHeader from '@/components/shared/card/CardHeader.svelte';
	import CardTitle from '@/components/shared/card/CardTitle.svelte';
	import CardContent from '@/components/shared/card/CardContent.svelte';
	import CardFooter from '@/components/shared/card/CardFooter.svelte';
	import Form from '@/components/shared/Form.svelte';
	import Input from '@/components/shared/Input.svelte';
	import Button from '@/components/shared/Button.svelte';

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
	<Card isBgTransparent>
		<CardHeader>
			<CardTitle>Sign In</CardTitle>
		</CardHeader>

		<CardContent>
			<Form>
				<Input type="email" name="email" label="Email Address" bind:value={email} required />
				<Input type="password" name="password" label="Password" bind:value={password} required />
				<Button isDisabled={isSubmitButtonDisabled} {isLoading} onclick={handleSubmit}>
					Sign In
				</Button>
			</Form>
		</CardContent>

		<CardFooter>
			<p>Don't have an account? <a href="/sign-up">Sign Up</a></p>
		</CardFooter>
	</Card>
</PageContainer>
