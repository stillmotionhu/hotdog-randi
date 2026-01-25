import type { Timestamp } from 'firebase/firestore';
import type { UserRole } from '@/types/user-role';

export interface UserDoc {
	uid: string;
	email: string;
	email_verified: boolean;
	firstname: string;
	lastname: string;
	role: UserRole;
	significant_other_uid: string;
	followings: Array<string>;
	followers: Array<string>;
	metadata: {
		registered_at: Timestamp;
		last_sign_in: Timestamp;
	};
}
