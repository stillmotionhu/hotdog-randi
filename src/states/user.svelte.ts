import { goto } from '$app/navigation';
import { getAuth, onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { doc, Timestamp, updateDoc } from 'firebase/firestore';
import { database } from '@/lib/firebase';
import { type User } from '@/collections/User';
import { fetchUserDataByUid } from '@/utils/users/fetch-user-data-by-uid';

interface UserConfiguration {
	data: User | null | undefined;
	uid: string | null | undefined;
	isSignedIn: boolean;
	isLoading: boolean;
}

const INITIAL_USER_CONFIGURATION: UserConfiguration = {
	data: undefined,
	uid: undefined,
	isSignedIn: false,
	isLoading: true
};

export const userState: UserConfiguration = $state<UserConfiguration>(INITIAL_USER_CONFIGURATION);

onAuthStateChanged(getAuth(), async (user: FirebaseUser | null): Promise<void> => {
	if (user === null) {
		userState.isSignedIn = false;
		userState.isLoading = false;
		return;
	}

	const userData = await fetchUserDataByUid(user.uid);

	if (userData === null) {
		return;
	}

	await updateDoc(doc(database, 'users', user.uid), {
		metadata: {
			registered_at: userData.metadata.registeredAt,
			last_sign_in: Timestamp.fromDate(new Date())
		}
	});

	userState.data = userData;
	userState.uid = user.uid;
	userState.isSignedIn = true;

	if (!userState.isLoading) {
		goto('/');
	}

	userState.isLoading = false;
});
