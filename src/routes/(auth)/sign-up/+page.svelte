<script lang="ts">
	import { signUpUserWithEmailAndPassword } from '@/utils/auth/sign-up-user-with-email-and-password';

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

	let firstname: string = $state<string>('');
	let lastname: string = $state<string>('');
	let email: string = $state<string>('');
	let password: string = $state<string>('');
	let confirmPassword: string = $state<string>('');

	let isSubmitButtonDisabled: boolean = $state<boolean>(true);
	let isLoading: boolean = $state<boolean>(false);

	const handleSubmit = async (): Promise<void> => {
		if (!(firstname && lastname && email && password && confirmPassword)) {
			return;
		}

		if (password !== confirmPassword) {
			confirmPassword = '';
			return;
		}

		isLoading = true;

		try {
			await signUpUserWithEmailAndPassword(email, password, firstname, lastname);
		} catch (error) {
			console.error('Error signing up:', error);

			password = '';
			confirmPassword = '';
			isLoading = false;
		}
	};

	$effect(() => {
		isSubmitButtonDisabled = !(
			firstname.trim() &&
			lastname.trim() &&
			email.trim() &&
			password.trim() &&
			confirmPassword.trim()
		);
	});
</script>

<PageContainer isCentered>
	<Card isBgTransparent>
		<CardHeader>
			<CardTitle>Sign Up</CardTitle>
		</CardHeader>

		<CardContent>
			<Form>
				<Input type="text" name="firstname" label="First Name" bind:value={firstname} required />
				<Input type="text" name="lastname" label="Last Name" bind:value={lastname} required />
				<Input type="email" name="email" label="Email Address" bind:value={email} required />
				<Input type="password" name="password" label="Password" bind:value={password} required />
				<Input
					type="password"
					name="confirm-password"
					label="Confirm Password"
					bind:value={confirmPassword}
					required
				/>
				<Button
					type="submit"
					isDisabled={isSubmitButtonDisabled}
					{isLoading}
					onclick={handleSubmit}
				>
					Sign Up
				</Button>
			</Form>
		</CardContent>

		<CardFooter>
			<p>Already have an account? <a href="/sign-in">Sign In</a></p>

			<FormSeparator />

			<ContinueWithGoogleButton />
		</CardFooter>
	</Card>
</PageContainer>
