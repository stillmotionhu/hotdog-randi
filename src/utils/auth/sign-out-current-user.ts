import { getAuth, signOut, type Auth } from 'firebase/auth';

export async function signOutCurrentUser(): Promise<void> {
	const auth: Auth = getAuth();

	try {
		await signOut(auth);
	} catch (error) {
		throw new Error('Error signing out the user: ' + (error as Error).message);
	}
}
