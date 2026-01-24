import type { Timestamp } from 'firebase/firestore';

export interface RatingDoc {
	location_name: string;
	location_address: string;
	date: Timestamp;
	dog_rating: number;
	dog_notes: string;
	bun_rating: number;
	bun_notes: string;
	sauce_rating: number;
	sauce_notes: string;
	sauce_to_dog_ratio_rating: number;
	sauce_to_dog_ratio_notes: string;
	dog_to_bun_ratio_rating: number;
	dog_to_bun_ratio_notes: string;
	overall_taste_rating: number;
	overall_taste_notes: string;
	customer_service_rating: number;
	customer_service_notes: string;
	overall_experience_rating: number;
	overall_experience_notes: string;
	extras: string;
	score: number;
	metadata: {
		created_by: string;
		created_at: Timestamp;
	};
}
