import {
	collection,
	getDocs,
	query,
	Query,
	QueryDocumentSnapshot,
	QuerySnapshot,
	where,
	type CollectionReference,
	type DocumentData
} from 'firebase/firestore';
import { database } from '@/lib/firebase';
import type { User } from '@/collections/User';

export async function fetchUserDataByUid(uid: string): Promise<User | null> {
	const usersRef: CollectionReference = collection(database, 'users');
	const userQuery: Query = query(usersRef, where('uid', '==', uid));
	const userSnapshot: QuerySnapshot = await getDocs(userQuery);

	if (userSnapshot.docs.length === 0) {
		return null;
	}

	const userDoc: QueryDocumentSnapshot = userSnapshot.docs[0];
	const userData: DocumentData = userDoc.data();

	return {
		uid: userData.uid,
		email: userData.email,
		emailVerified: userData.email_verified,
		firstname: userData.firstname,
		lastname: userData.lastname,
		role: userData.role,
		significantOtherUid: userData.significant_other_uid,
		followings: userData.followings,
		followers: userData.followers,
		metadata: {
			registeredAt: userData.metadata.registered_at,
			lastSignIn: userData.metadata.last_sign_in
		}
	};
}
