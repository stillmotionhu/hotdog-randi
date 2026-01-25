import { createUserWithEmailAndPassword, getAuth, type UserCredential } from 'firebase/auth';
import { doc, DocumentReference, setDoc, Timestamp } from 'firebase/firestore';
import { database } from '@/lib/firebase';
import type { UserDoc } from '@/collections/UserDoc';

export async function signUpUserWithEmailAndPassword(
	email: string,
	password: string,
	firstname: string,
	lastname: string
): Promise<UserCredential> {
	if (!(email && password && firstname && lastname)) {
		throw new Error('All fields must be provided.');
	}

	const auth = getAuth();
	let userCredential: UserCredential;

	try {
		userCredential = await createUserWithEmailAndPassword(auth, email, password);
	} catch (error) {
		throw new Error(`Failed to sign up: ${(error as Error).message}`);
	}

	try {
		const user: UserDoc = {
			uid: userCredential.user.uid,
			email: email,
			email_verified: false,
			firstname: firstname,
			lastname: lastname,
			role: 'user',
			significant_other_uid: '',
			followings: [],
			followers: [],
			metadata: {
				registered_at: Timestamp.fromDate(new Date()),
				last_sign_in: Timestamp.fromDate(new Date())
			}
		};

		const userRef: DocumentReference = doc(database, 'users', userCredential.user.uid);

		await setDoc(userRef, user);

		return userCredential;
	} catch (error) {
		throw new Error(`Failed to sign up: ${(error as Error).message}`);
	}
}
