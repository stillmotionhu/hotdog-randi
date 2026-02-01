import { userState } from '@/states/user.svelte';
import { isAccountFollowedByCurrentUser } from './is-account-followed-by-current-user';
import { database } from '@/lib/firebase';
import { doc, DocumentReference, updateDoc } from 'firebase/firestore';

export async function followUserByUid(uid: string): Promise<void> {
	if (!(userState && userState.uid && userState.data)) {
		throw Error('There are no current user signed in!');
	}

	if (await isAccountFollowedByCurrentUser(uid)) {
		throw Error('The current user already follows this account!');
	}

	const userDoc: DocumentReference = doc(database, 'users', userState.uid);

	await updateDoc(userDoc, {
		followings: [...userState.data.followings, uid]
	});
}
