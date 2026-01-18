import type { UserRole } from '@/types/user-role';
import { Timestamp } from 'firebase/firestore';

export interface User {
	uid: string;
	email: string;
	emailVerified: boolean;
	firstname: string;
	lastname: string;
	role: UserRole;
	significantOtherUid: string;
	followings: Array<string>;
	followers: Array<string>;
	metadata: {
		registeredAt: Timestamp;
		lastSignIn: Timestamp;
	};
}
