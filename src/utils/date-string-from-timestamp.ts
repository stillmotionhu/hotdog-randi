import type { Timestamp } from 'firebase/firestore';

export function dateStringFromTimestamp(timestamp: Timestamp): string {
	return new Date(timestamp.seconds * 1000).toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}
