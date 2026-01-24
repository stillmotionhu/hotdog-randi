<script lang="ts">
	import { goto } from '$app/navigation';
	import { database } from '@/lib/firebase';
	import { addDoc, collection, CollectionReference, Timestamp } from 'firebase/firestore';
	import { userState } from '@/states/user.svelte';
	import type { RatingDoc } from '@/collections/RatingDoc';

	import PageTitle from '@/components/shared/PageTitle.svelte';
	import Form from '@/components/shared/Form.svelte';
	import Input from '@/components/shared/Input.svelte';
	import RangeInput from '@/components/shared/RangeInput.svelte';
	import Button from '@/components/shared/Button.svelte';

	let locationName: string = $state<string>('');
	let locationAddress: string = $state<string>('');
	let dogRating: number = $state<number>(5);
	let dogNotes: string = $state<string>('');
	let bunRating: number = $state<number>(5);
	let bunNotes: string = $state<string>('');
	let sauceRating: number = $state<number>(5);
	let sauceNotes: string = $state<string>('');
	let sauceToDogRatioRating: number = $state<number>(5);
	let sauceToDogRatioNotes: string = $state<string>('');
	let dogToBunRatioRating: number = $state<number>(5);
	let dogToBunRatioNotes: string = $state<string>('');
	let overallTasteRating: number = $state<number>(5);
	let overallTasteNotes: string = $state<string>('');
	let customerServiceRating: number = $state<number>(5);
	let customerServiceNotes: string = $state<string>('');
	let overallExperienceRating: number = $state<number>(5);
	let overallExperienceNotes: string = $state<string>('');
	let extras: string = $state<string>('');

	let isSubmitButtonDisabled: boolean = $state<boolean>(true);
	let isLoading: boolean = $state<boolean>(false);

	const handleSubmit = async (): Promise<void> => {
		// TODO: Add redirecting
		if (!userState.uid) {
			return;
		}

		if (!(locationName && locationAddress)) {
			return;
		}

		isLoading = true;

		const score: number =
			(dogRating +
				bunRating +
				sauceRating +
				sauceToDogRatioRating +
				dogToBunRatioRating +
				overallTasteRating +
				customerServiceRating +
				overallExperienceRating) /
			8;

		const rating: RatingDoc = {
			location_name: locationName,
			location_address: locationAddress,
			date: Timestamp.fromDate(new Date()),
			dog_rating: dogRating,
			dog_notes: dogNotes,
			bun_rating: bunRating,
			bun_notes: bunNotes,
			sauce_rating: sauceRating,
			sauce_notes: sauceNotes,
			sauce_to_dog_ratio_rating: sauceToDogRatioRating,
			sauce_to_dog_ratio_notes: sauceToDogRatioNotes,
			dog_to_bun_ratio_rating: dogToBunRatioRating,
			dog_to_bun_ratio_notes: dogToBunRatioNotes,
			overall_taste_rating: overallTasteRating,
			overall_taste_notes: overallTasteNotes,
			customer_service_rating: customerServiceRating,
			customer_service_notes: customerServiceNotes,
			overall_experience_rating: overallExperienceRating,
			overall_experience_notes: overallExperienceNotes,
			extras: extras,
			score: score,
			metadata: {
				created_by: userState.uid,
				created_at: Timestamp.fromDate(new Date())
			}
		};

		const ratingsRef: CollectionReference = collection(database, 'ratings');

		// TODO: Handle errors
		await addDoc(ratingsRef, rating);

		goto('/ratings');
	};

	$effect((): void => {
		isSubmitButtonDisabled = locationName.trim() === '' || locationAddress.trim() === '';
	});
</script>

<PageTitle>Create New Rating</PageTitle>

<Form>
	<Input
		type="text"
		name="location-name"
		label="Location Name"
		bind:value={locationName}
		required={true}
	/>
	<Input
		type="text"
		name="location-address"
		label="Location Address"
		bind:value={locationAddress}
		required={true}
	/>
	<!-- TODO: Date Picker -->
	<RangeInput name="dog-rating" label="Dog" bind:value={dogRating} />
	<Input type="text" name="dog-notes" label="Dog Notes" bind:value={dogNotes} />
	<RangeInput name="bun-rating" label="Bun" bind:value={bunRating} />
	<Input type="text" name="bun-notes" label="Bun Notes" bind:value={bunNotes} />
	<RangeInput name="sauce-rating" label="Sauce" bind:value={sauceRating} />
	<Input type="text" name="sauce-notes" label="Sauce Notes" bind:value={sauceNotes} />
	<RangeInput
		name="sauce-to-dog-ratio-rating"
		label="Sauce to Dog Ratio"
		bind:value={sauceToDogRatioRating}
	/>
	<Input
		type="text"
		name="sauce-to-dog-ratio-notes"
		label="Sauce to Dog Ratio Notes"
		bind:value={sauceToDogRatioNotes}
	/>
	<RangeInput
		name="dog-to-bun-ratio-rating"
		label="Dog to Bun Ratio"
		bind:value={dogToBunRatioRating}
	/>
	<Input
		type="text"
		name="dog-to-bun-ratio-notes"
		label="Dog to Bun Ratio Notes"
		bind:value={dogToBunRatioNotes}
	/>
	<RangeInput name="overall-taste-rating" label="Overall Taste" bind:value={overallTasteRating} />
	<Input
		type="text"
		name="overall-taste-notes"
		label="Overall Taste Notes"
		bind:value={overallTasteNotes}
	/>
	<RangeInput
		name="customer-service-rating"
		label="Customer Service"
		bind:value={customerServiceRating}
	/>
	<Input
		type="text"
		name="customer-service-notes"
		label="Customer Service Notes"
		bind:value={customerServiceNotes}
	/>
	<RangeInput
		name="overall-experience-rating"
		label="Overall Experience"
		bind:value={overallExperienceRating}
	/>
	<Input
		type="text"
		name="overall-experience-notes"
		label="Overall Experience Notes"
		bind:value={overallExperienceNotes}
	/>
	<Input type="text" name="extras" label="Extras" bind:value={extras} />
	<Button isDisabled={isSubmitButtonDisabled} {isLoading} onclick={handleSubmit}>Add review</Button>
</Form>

<style lang="scss">
	@keyframes reveal-element {
		0% {
			opacity: 0;
			transform: scale(0.7, 0.8) translateY(15px);
		}

		100% {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	:global {
		.page-title,
		.form > * {
			animation-name: reveal-element;
			animation-duration: 0.5s;
			animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
			animation-fill-mode: backwards;
		}

		.form > * {
			@for $i from 1 through 20 {
				&:nth-child(#{$i}) {
					animation-delay: #{0.025 * $i}s;
				}
			}
		}
	}
</style>
