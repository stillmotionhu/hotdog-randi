import { userState } from '@/states/user.svelte';
import type { User } from '@/collections/User';
import { fetchUserDataByUid } from './fetch-user-data-by-uid';

export async function isCurrentUserFollowedByUid(uid: string): Promise<boolean> {
	if (!userState.uid) {
		throw Error('There are no current user signed in!');
	}

	let userData: User | null;

	try {
		userData = await fetchUserDataByUid(userState.uid);
	} catch (error) {
		throw Error((error as Error).message);
	}

	if (userData === null) {
		throw Error('There are no user with the UID ' + userState.uid + '.');
	}

	const followers: Array<string> = userData.followers;

	return followers.includes(uid);
}
