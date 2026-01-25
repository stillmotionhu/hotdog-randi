import { getAuth, signInWithEmailAndPassword, type UserCredential } from 'firebase/auth';

export async function signInUserWithEmailAndPassword(
	email: string,
	password: string
): Promise<UserCredential> {
	if (!(email && password)) {
		throw new Error('Email and password must be provided.');
	}

	const auth = getAuth();

	try {
		const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);

		return userCredential;
	} catch (error) {
		throw new Error(`Failed to sign in: ${(error as Error).message}`);
	}
}
