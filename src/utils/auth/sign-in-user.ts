import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export async function signInUser(email: string, password: string): Promise<void> {
	if (!(email && password)) {
		throw new Error('Email and password must be provided.');
	}

	const auth = getAuth();

	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (error) {
		throw new Error(`Failed to sign in: ${(error as Error).message}`);
	}
}
