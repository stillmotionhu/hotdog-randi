import type { UserDoc } from '@/collections/UserDoc';
import { database } from '@/lib/firebase';
import {
	getAdditionalUserInfo,
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	type AdditionalUserInfo,
	type User,
	type UserCredential
} from 'firebase/auth';
import { doc, DocumentReference, setDoc, Timestamp } from 'firebase/firestore';

export async function signInUserWithGoogle(): Promise<void> {
	const googleProvider: GoogleAuthProvider = new GoogleAuthProvider();
	const auth = getAuth();

	auth.useDeviceLanguage();

	signInWithPopup(auth, googleProvider).then(async (result: UserCredential) => {
		const user: User = result.user;
		const additionalUserInfo: AdditionalUserInfo | null = getAdditionalUserInfo(result);

		// If there are no additional user info, or the user is not new, just return
		// the provided user info.
		if (!additionalUserInfo || additionalUserInfo.isNewUser === false) {
			return user;
		}

		// If the user signs in for the first time, create a user document for them.
		if (
			!(
				user.displayName &&
				user.email &&
				user.metadata.creationTime &&
				user.metadata.lastSignInTime
			)
		) {
			throw Error('There were some parameters that were missing from the provided data.');
		}

		let [firstname, ...lastnameBits] = user.displayName.split(' ');
		let lastname = lastnameBits.join('');

		const userDoc: UserDoc = {
			uid: user.uid,
			email: user.email,
			email_verified: user.emailVerified,
			firstname: firstname,
			lastname: lastname,
			role: 'user',
			significant_other_uid: '',
			followings: [],
			followers: [],
			metadata: {
				registered_at: Timestamp.fromDate(new Date(user.metadata.creationTime)),
				last_sign_in: Timestamp.fromDate(new Date(user.metadata.lastSignInTime))
			}
		};

		const userRef: DocumentReference = doc(database, 'users', user.uid);

		await setDoc(userRef, userDoc);

		return userDoc;
	});
}
