import {
	collection,
	getDocs,
	orderBy,
	query,
	Query,
	QueryDocumentSnapshot,
	QueryOrderByConstraint,
	QuerySnapshot,
	Timestamp,
	where,
	type CollectionReference,
	type DocumentData
} from 'firebase/firestore';
import { database } from '@/lib/firebase';
import type { Rating } from '@/collections/Rating';
import { fetchUserDataByUid } from '@/utils/users/fetch-user-data-by-uid';

export async function fetchRatingsByUserUid(
	uid: string,
	order: string
): Promise<Array<Rating> | null> {
	const userData = await fetchUserDataByUid(uid);

	if (userData === null) {
		throw Error('There is no user with the givan UID.');
	}

	const ratingsRef: CollectionReference = collection(database, 'ratings');
	const ratingsQuery: Query = query(
		ratingsRef,
		where('metadata.created_by', 'in', [uid, userData.significantOtherUid])
	);
	const ratingsSnapshot: QuerySnapshot = await getDocs(ratingsQuery);

	if (ratingsSnapshot.docs.length === 0) {
		return null;
	}

	const ratings: Array<Rating> = ratingsSnapshot.docs.map((doc: QueryDocumentSnapshot): Rating => {
		const data: DocumentData = doc.data();

		return {
			uid: doc.id,
			locationName: data.location_name,
			locationAddress: data.location_address,
			date: data.date,
			dogRating: data.dog_rating,
			dogNotes: data.dog_notes,
			bunRating: data.bun_rating,
			bunNotes: data.bun_notes,
			sauceRating: data.sauce_rating,
			sauceNotes: data.sauce_notes,
			sauceToDogRatioRating: data.sauce_to_dog_ratio_rating,
			sauceToDogRatioNotes: data.sauce_to_dog_ratio_notes,
			dogToBunRatioRating: data.dog_to_bun_ratio_rating,
			dogToBunRatioNotes: data.dog_to_bun_ratio_notes,
			overallTasteRating: data.overall_taste_rating,
			overallTasteNotes: data.overall_taste_notes,
			customerServiceRating: data.customer_service_rating,
			customerServiceNotes: data.customer_service_notes,
			overallExperienceRating: data.overall_experience_rating,
			overallExperienceNotes: data.overall_experience_notes,
			score: data.score,
			metadata: {
				createdBy: data.metadata.created_by,
				createdAt: data.metadata.created_at || data.date
			}
		};
	});

	ratings.sort((a: Rating, b: Rating): number => {
		switch (order) {
			default:
			case 'date-asc':
				if (a.date < b.date) {
					return -1;
				}

				if (a.date > b.date) {
					return 1;
				}

				return 0;
			case 'date-desc':
				if (a.date > b.date) {
					return -1;
				}

				if (a.date < b.date) {
					return 1;
				}

				return 0;
			case 'score-asc':
				if (a.score < b.score) {
					return -1;
				}

				if (a.score > b.score) {
					return 1;
				}

				return 0;
			case 'score-desc':
				if (a.score > b.score) {
					return -1;
				}

				if (a.score < b.score) {
					return 1;
				}

				return 0;
		}
	});

	return ratings;
}
